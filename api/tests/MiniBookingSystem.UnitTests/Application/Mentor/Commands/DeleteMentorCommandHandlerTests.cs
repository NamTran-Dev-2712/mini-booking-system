using MediatR;

namespace MiniBookingSystem.UnitTests.Application.Mentor.Commands;

public sealed class DeleteMentorCommandHandlerTests
{
    private readonly Mock<IUnitOfWork> _unitOfWork;
    private readonly Mock<IMentorRepository> _mentorRepo;
    private readonly Mock<IUserRepository> _userRepo;
    private readonly Mock<ICacheService> _cacheService;
    private readonly DeleteMentorCommandHandler _sut;

    public DeleteMentorCommandHandlerTests()
    {
        _unitOfWork = new Mock<IUnitOfWork>(MockBehavior.Strict);
        _mentorRepo = new Mock<IMentorRepository>(MockBehavior.Strict);
        _userRepo = new Mock<IUserRepository>(MockBehavior.Strict);
        _cacheService = new Mock<ICacheService>(MockBehavior.Strict);

        _unitOfWork.Setup(u => u.Mentor).Returns(_mentorRepo.Object);
        _unitOfWork.Setup(u => u.User).Returns(_userRepo.Object);

        _sut = new DeleteMentorCommandHandler(_unitOfWork.Object, _cacheService.Object);
    }

    private global::Mentor SetupHappyPath(Guid mentorId)
    {
        var mentor = MentorTestData.BuildMentor(id: mentorId);

        _mentorRepo
            .Setup(r => r.GetByIdAsync(mentorId, It.IsAny<CancellationToken>()))
            .ReturnsAsync(mentor);

        _unitOfWork
            .Setup(u => u.BeginTransactionAsync(It.IsAny<CancellationToken>()))
            .Returns(Task.CompletedTask);

        _unitOfWork.Setup(u => u.Mentor.Update(It.IsAny<global::Mentor>()));

        _userRepo
            .Setup(r => r.DeleteUserAsync(mentor.UserId, It.IsAny<CancellationToken>()))
            .ReturnsAsync(mentor.UserId);

        _unitOfWork.Setup(u => u.SaveChangesAsync(It.IsAny<CancellationToken>())).ReturnsAsync(1);

        _unitOfWork
            .Setup(u => u.CommitTransactionAsync(It.IsAny<CancellationToken>()))
            .Returns(Task.CompletedTask);

        _cacheService
            .Setup(c =>
                c.RemoveAsync(CacheKeys.MentorDetail(mentorId), It.IsAny<CancellationToken>())
            )
            .Returns(Task.CompletedTask);

        return mentor;
    }

    // ── Success path ───────────────────────────────────────────────────────

    [Fact]
    public async Task Handle_WithValidId_ReturnsUnitValue()
    {
        // Arrange
        var command = new DeleteMentorCommand(MentorTestData.Valid.MentorId);
        SetupHappyPath(command.MentorId);

        // Act
        var result = await _sut.Handle(command, CancellationToken.None);

        // Assert
        result.Should().Be(Unit.Value);
    }

    [Fact]
    public async Task Handle_SoftDeletesMentor_SetsIsDeletedAndDeletedAt()
    {
        // Arrange
        var command = new DeleteMentorCommand(MentorTestData.Valid.MentorId);
        var mentor = SetupHappyPath(command.MentorId);

        // Act
        await _sut.Handle(command, CancellationToken.None);

        // Assert
        mentor.IsDeleted.Should().BeTrue();
        mentor.DeletedAt.Should().NotBeNull();
    }

    [Fact]
    public async Task Handle_AnonymizesEmailBeforeDeletion()
    {
        // Arrange
        var command = new DeleteMentorCommand(MentorTestData.Valid.MentorId);
        var mentor = SetupHappyPath(command.MentorId);
        var originalEmail = mentor.Email;

        // Act
        await _sut.Handle(command, CancellationToken.None);

        // Assert
        mentor.Email.Should().NotBe(originalEmail);
        mentor.Email.Should().Contain("deleted_");
    }

    [Fact]
    public async Task Handle_CommitsTransactionAfterSuccessfulDelete()
    {
        // Arrange
        var command = new DeleteMentorCommand(MentorTestData.Valid.MentorId);
        SetupHappyPath(command.MentorId);

        // Act
        await _sut.Handle(command, CancellationToken.None);

        // Assert
        _unitOfWork.Verify(
            u => u.CommitTransactionAsync(It.IsAny<CancellationToken>()),
            Times.Once
        );
    }

    [Fact]
    public async Task Handle_InvalidatesCacheAfterDeletion()
    {
        // Arrange
        var command = new DeleteMentorCommand(MentorTestData.Valid.MentorId);
        SetupHappyPath(command.MentorId);

        // Act
        await _sut.Handle(command, CancellationToken.None);

        // Assert
        _cacheService.Verify(
            c =>
                c.RemoveAsync(
                    CacheKeys.MentorDetail(command.MentorId),
                    It.IsAny<CancellationToken>()
                ),
            Times.Once
        );
    }

    // ── Error paths ────────────────────────────────────────────────────────

    [Fact]
    public async Task Handle_WhenMentorNotFound_ThrowsNotFoundException()
    {
        // Arrange
        var command = new DeleteMentorCommand(MentorTestData.Valid.MentorId);

        _mentorRepo
            .Setup(r => r.GetByIdAsync(command.MentorId, It.IsAny<CancellationToken>()))
            .ReturnsAsync((global::Mentor?)null);

        // Act
        var act = () => _sut.Handle(command, CancellationToken.None);

        // Assert
        await act.Should()
            .ThrowAsync<NotFoundException>()
            .WithMessage($"*Mentor*{command.MentorId}*");
    }

    [Fact]
    public async Task Handle_WhenDeleteUserThrows_RollsBackTransactionAndRethrows()
    {
        // Arrange
        var command = new DeleteMentorCommand(MentorTestData.Valid.MentorId);
        var mentor = MentorTestData.BuildMentor(id: command.MentorId);

        _mentorRepo
            .Setup(r => r.GetByIdAsync(command.MentorId, It.IsAny<CancellationToken>()))
            .ReturnsAsync(mentor);
        _unitOfWork
            .Setup(u => u.BeginTransactionAsync(It.IsAny<CancellationToken>()))
            .Returns(Task.CompletedTask);
        _unitOfWork.Setup(u => u.Mentor.Update(It.IsAny<global::Mentor>()));
        _userRepo
            .Setup(r => r.DeleteUserAsync(mentor.UserId, It.IsAny<CancellationToken>()))
            .ThrowsAsync(new InvalidOperationException("Delete user failed"));
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
