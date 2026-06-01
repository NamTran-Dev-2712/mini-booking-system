namespace MiniBookingSystem.UnitTests.Application.Mentor.Commands;

public sealed class UpdateMentorStatusCommandHandlerTests
{
    private readonly Mock<IUnitOfWork> _unitOfWork;
    private readonly Mock<IMentorRepository> _mentorRepo;
    private readonly Mock<IUserRepository> _userRepo;
    private readonly Mock<IRefreshTokenRepository> _refreshTokenRepo;
    private readonly Mock<ICacheService> _cacheService;
    private readonly UpdateMentorStatusCommandHandler _sut;

    public UpdateMentorStatusCommandHandlerTests()
    {
        _unitOfWork = new Mock<IUnitOfWork>(MockBehavior.Strict);
        _mentorRepo = new Mock<IMentorRepository>(MockBehavior.Strict);
        _userRepo = new Mock<IUserRepository>(MockBehavior.Strict);
        _refreshTokenRepo = new Mock<IRefreshTokenRepository>(MockBehavior.Strict);
        _cacheService = new Mock<ICacheService>(MockBehavior.Strict);
        var localizer = new Mock<ILocalizationService>();
        localizer.Setup(l => l.GetMessage(It.IsAny<string>())).Returns((string key) => key);
        localizer.Setup(l => l.GetMessage("Mentor.NotFound")).Returns("Mentor not found.");

        _unitOfWork.Setup(u => u.Mentor).Returns(_mentorRepo.Object);
        _unitOfWork.Setup(u => u.User).Returns(_userRepo.Object);

        _sut = new UpdateMentorStatusCommandHandler(
            _unitOfWork.Object,
            _refreshTokenRepo.Object,
            _cacheService.Object,
            localizer.Object
        );
    }

    private global::Mentor SetupHappyPath(UpdateMentorStatusCommand cmd)
    {
        var mentor = MentorTestData.BuildMentor(id: cmd.Id, isActive: !cmd.IsActive);

        _unitOfWork
            .Setup(u => u.BeginTransactionAsync(It.IsAny<CancellationToken>()))
            .Returns(Task.CompletedTask);
        _mentorRepo
            .Setup(r => r.GetByIdAsync(cmd.Id, It.IsAny<CancellationToken>()))
            .ReturnsAsync(mentor);
        _userRepo
            .Setup(r =>
                r.SetActiveAsync(mentor.UserId, cmd.IsActive, It.IsAny<CancellationToken>())
            )
            .Returns(Task.CompletedTask);
        _unitOfWork.Setup(u => u.SaveChangesAsync(It.IsAny<CancellationToken>())).ReturnsAsync(1);
        _refreshTokenRepo
            .Setup(r => r.RemoveRefreshTokenAsync(mentor.UserId.ToString()))
            .Returns(Task.CompletedTask);
        _unitOfWork
            .Setup(u => u.CommitTransactionAsync(It.IsAny<CancellationToken>()))
            .Returns(Task.CompletedTask);
        _cacheService
            .Setup(c =>
                c.RemoveAsync(CacheKeys.MentorDetail(mentor.Id), It.IsAny<CancellationToken>())
            )
            .Returns(Task.CompletedTask);

        return mentor;
    }

    // ── Success paths ──────────────────────────────────────────────────────

    [Fact]
    public async Task Handle_WhenLocking_SetsMentorAndUserInactive()
    {
        // Arrange
        var command = new UpdateMentorStatusCommand(MentorTestData.Valid.MentorId, IsActive: false);
        var mentor = SetupHappyPath(command);

        // Act
        var result = await _sut.Handle(command, CancellationToken.None);

        // Assert
        result.Should().Be(command.Id);
        mentor.IsActive.Should().BeFalse();
        _userRepo.Verify(
            r => r.SetActiveAsync(mentor.UserId, false, It.IsAny<CancellationToken>()),
            Times.Once
        );
    }

    [Fact]
    public async Task Handle_WhenLocking_RevokesRefreshTokens()
    {
        // Arrange
        var command = new UpdateMentorStatusCommand(MentorTestData.Valid.MentorId, IsActive: false);
        var mentor = SetupHappyPath(command);

        // Act
        await _sut.Handle(command, CancellationToken.None);

        // Assert
        _refreshTokenRepo.Verify(
            r => r.RemoveRefreshTokenAsync(mentor.UserId.ToString()),
            Times.Once
        );
    }

    [Fact]
    public async Task Handle_WhenUnlocking_SetsActiveAndDoesNotRevokeTokens()
    {
        // Arrange
        var command = new UpdateMentorStatusCommand(MentorTestData.Valid.MentorId, IsActive: true);
        var mentor = SetupHappyPath(command);

        // Act
        await _sut.Handle(command, CancellationToken.None);

        // Assert
        mentor.IsActive.Should().BeTrue();
        _refreshTokenRepo.Verify(r => r.RemoveRefreshTokenAsync(It.IsAny<string>()), Times.Never);
    }

    [Fact]
    public async Task Handle_CommitsTransactionAndInvalidatesCache()
    {
        // Arrange
        var command = new UpdateMentorStatusCommand(MentorTestData.Valid.MentorId, IsActive: false);
        var mentor = SetupHappyPath(command);

        // Act
        await _sut.Handle(command, CancellationToken.None);

        // Assert
        _unitOfWork.Verify(
            u => u.CommitTransactionAsync(It.IsAny<CancellationToken>()),
            Times.Once
        );
        _cacheService.Verify(
            c => c.RemoveAsync(CacheKeys.MentorDetail(mentor.Id), It.IsAny<CancellationToken>()),
            Times.Once
        );
    }

    // ── Error paths ────────────────────────────────────────────────────────

    [Fact]
    public async Task Handle_WhenMentorNotFound_ThrowsNotFoundException()
    {
        // Arrange
        var command = new UpdateMentorStatusCommand(MentorTestData.Valid.MentorId, IsActive: false);

        _unitOfWork
            .Setup(u => u.BeginTransactionAsync(It.IsAny<CancellationToken>()))
            .Returns(Task.CompletedTask);
        _mentorRepo
            .Setup(r => r.GetByIdAsync(command.Id, It.IsAny<CancellationToken>()))
            .ReturnsAsync((global::Mentor?)null);
        _unitOfWork
            .Setup(u => u.RollbackTransactionAsync(It.IsAny<CancellationToken>()))
            .Returns(Task.CompletedTask);

        // Act
        var act = () => _sut.Handle(command, CancellationToken.None);

        // Assert
        await act.Should().ThrowAsync<NotFoundException>().WithMessage("*Mentor not found*");
    }

    [Fact]
    public async Task Handle_WhenSetActiveThrows_RollsBackAndRethrows()
    {
        // Arrange
        var command = new UpdateMentorStatusCommand(MentorTestData.Valid.MentorId, IsActive: false);
        var mentor = MentorTestData.BuildMentor(id: command.Id);

        _unitOfWork
            .Setup(u => u.BeginTransactionAsync(It.IsAny<CancellationToken>()))
            .Returns(Task.CompletedTask);
        _mentorRepo
            .Setup(r => r.GetByIdAsync(command.Id, It.IsAny<CancellationToken>()))
            .ReturnsAsync(mentor);
        _userRepo
            .Setup(r => r.SetActiveAsync(mentor.UserId, false, It.IsAny<CancellationToken>()))
            .ThrowsAsync(new InvalidOperationException("DB error"));
        _unitOfWork
            .Setup(u => u.RollbackTransactionAsync(It.IsAny<CancellationToken>()))
            .Returns(Task.CompletedTask);

        // Act
        var act = () => _sut.Handle(command, CancellationToken.None);

        // Assert
        await act.Should().ThrowAsync<InvalidOperationException>();
        _unitOfWork.Verify(
            u => u.RollbackTransactionAsync(It.IsAny<CancellationToken>()),
            Times.Once
        );
        _unitOfWork.Verify(
            u => u.CommitTransactionAsync(It.IsAny<CancellationToken>()),
            Times.Never
        );
    }
}
