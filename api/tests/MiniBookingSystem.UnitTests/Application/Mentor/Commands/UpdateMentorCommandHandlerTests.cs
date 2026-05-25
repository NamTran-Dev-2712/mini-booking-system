namespace MiniBookingSystem.UnitTests.Application.Mentor.Commands;

public sealed class UpdateMentorCommandHandlerTests
{
    private readonly Mock<IUnitOfWork> _unitOfWork;
    private readonly Mock<IMentorRepository> _mentorRepo;
    private readonly Mock<IUserRepository> _userRepo;
    private readonly Mock<ICacheService> _cacheService;
    private readonly UpdateMentorCommandHandler _sut;

    public UpdateMentorCommandHandlerTests()
    {
        _unitOfWork = new Mock<IUnitOfWork>(MockBehavior.Strict);
        _mentorRepo = new Mock<IMentorRepository>(MockBehavior.Strict);
        _userRepo = new Mock<IUserRepository>(MockBehavior.Strict);
        _cacheService = new Mock<ICacheService>(MockBehavior.Strict);
        var localizer = new Mock<ILocalizationService>();
        localizer.Setup(l => l.GetMessage(It.IsAny<string>())).Returns((string key) => key);
        localizer.Setup(l => l.GetMessage("Mentor.NotFound")).Returns("Mentor not found.");

        _unitOfWork.Setup(u => u.Mentor).Returns(_mentorRepo.Object);
        _unitOfWork.Setup(u => u.User).Returns(_userRepo.Object);

        _sut = new UpdateMentorCommandHandler(
            _unitOfWork.Object,
            _cacheService.Object,
            localizer.Object
        );
    }

    private global::Mentor SetupHappyPath(UpdateMentorCommand cmd)
    {
        var mentor = MentorTestData.BuildMentor(id: cmd.Id);

        _unitOfWork
            .Setup(u => u.BeginTransactionAsync(It.IsAny<CancellationToken>()))
            .Returns(Task.CompletedTask);
        _mentorRepo
            .Setup(r => r.GetByIdAsync(cmd.Id, It.IsAny<CancellationToken>()))
            .ReturnsAsync(mentor);
        _userRepo
            .Setup(r =>
                r.UpdateUserAsync(
                    mentor.UserId,
                    It.IsAny<string?>(),
                    It.IsAny<string?>(),
                    It.IsAny<CancellationToken>()
                )
            )
            .Returns(Task.CompletedTask);
        _unitOfWork.Setup(u => u.SaveChangesAsync(It.IsAny<CancellationToken>())).ReturnsAsync(1);
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

    // ── Success path ───────────────────────────────────────────────────────

    [Fact]
    public async Task Handle_WithValidData_ReturnsMentorId()
    {
        // Arrange
        var command = MentorTestData.BuildUpdateMentorCommand();
        SetupHappyPath(command);

        // Act
        var result = await _sut.Handle(command, CancellationToken.None);

        // Assert
        result.Should().Be(command.Id);
    }

    [Fact]
    public async Task Handle_UpdatesMentorFields()
    {
        // Arrange
        var command = MentorTestData.BuildUpdateMentorCommand();
        var mentor = SetupHappyPath(command);

        // Act
        await _sut.Handle(command, CancellationToken.None);

        // Assert — domain entity should reflect new values after Update() is called
        mentor.DisplayName.Should().Be(command.DisplayName);
        mentor.Bio.Should().Be(command.Bio);
        mentor.Specialization.Should().Be(command.Specialization);
        mentor.ExperienceYears.Should().Be(command.ExperienceYears!.Value);
        mentor.BasePrice.Should().Be(command.BasePrice!.Value);
    }

    [Fact]
    public async Task Handle_WhenFullNameIsProvided_CallsUpdateUserAsync()
    {
        // Arrange
        var command = MentorTestData.BuildUpdateMentorCommand(); // has FullName set
        var mentor = SetupHappyPath(command);

        // Act
        await _sut.Handle(command, CancellationToken.None);

        // Assert
        _userRepo.Verify(
            r =>
                r.UpdateUserAsync(
                    mentor.UserId,
                    command.FullName,
                    command.PhoneNumber,
                    It.IsAny<CancellationToken>()
                ),
            Times.Once
        );
    }

    [Fact]
    public async Task Handle_WhenNoIdentityFieldsProvided_SkipsUserUpdate()
    {
        // Arrange
        var command = new UpdateMentorCommand(
            Id: MentorTestData.Valid.MentorId,
            FullName: null,
            PhoneNumber: null,
            DisplayName: "Only Mentor Fields",
            Bio: null,
            Specialization: null,
            ExperienceYears: null,
            BasePrice: null,
            AvatarUrl: null
        );
        var mentor = MentorTestData.BuildMentor(id: command.Id);

        _unitOfWork
            .Setup(u => u.BeginTransactionAsync(It.IsAny<CancellationToken>()))
            .Returns(Task.CompletedTask);
        _mentorRepo
            .Setup(r => r.GetByIdAsync(command.Id, It.IsAny<CancellationToken>()))
            .ReturnsAsync(mentor);
        _unitOfWork.Setup(u => u.SaveChangesAsync(It.IsAny<CancellationToken>())).ReturnsAsync(1);
        _unitOfWork
            .Setup(u => u.CommitTransactionAsync(It.IsAny<CancellationToken>()))
            .Returns(Task.CompletedTask);
        _cacheService
            .Setup(c =>
                c.RemoveAsync(CacheKeys.MentorDetail(mentor.Id), It.IsAny<CancellationToken>())
            )
            .Returns(Task.CompletedTask);

        // Act
        await _sut.Handle(command, CancellationToken.None);

        // Assert — UpdateUserAsync should NOT be called
        _userRepo.Verify(
            r =>
                r.UpdateUserAsync(
                    It.IsAny<Guid>(),
                    It.IsAny<string?>(),
                    It.IsAny<string?>(),
                    It.IsAny<CancellationToken>()
                ),
            Times.Never
        );
    }

    [Fact]
    public async Task Handle_CommitsTransactionAfterSuccess()
    {
        // Arrange
        var command = MentorTestData.BuildUpdateMentorCommand();
        SetupHappyPath(command);

        // Act
        await _sut.Handle(command, CancellationToken.None);

        // Assert
        _unitOfWork.Verify(
            u => u.CommitTransactionAsync(It.IsAny<CancellationToken>()),
            Times.Once
        );
    }

    [Fact]
    public async Task Handle_InvalidatesCacheAfterUpdate()
    {
        // Arrange
        var command = MentorTestData.BuildUpdateMentorCommand();
        var mentor = SetupHappyPath(command);

        // Act
        await _sut.Handle(command, CancellationToken.None);

        // Assert
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
        var command = MentorTestData.BuildUpdateMentorCommand();

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
    public async Task Handle_WhenSaveChangesThrows_RollsBackTransactionAndRethrows()
    {
        // Arrange
        var command = MentorTestData.BuildUpdateMentorCommand();
        var mentor = MentorTestData.BuildMentor(id: command.Id);

        _unitOfWork
            .Setup(u => u.BeginTransactionAsync(It.IsAny<CancellationToken>()))
            .Returns(Task.CompletedTask);
        _mentorRepo
            .Setup(r => r.GetByIdAsync(command.Id, It.IsAny<CancellationToken>()))
            .ReturnsAsync(mentor);
        _userRepo
            .Setup(r =>
                r.UpdateUserAsync(
                    mentor.UserId,
                    It.IsAny<string?>(),
                    It.IsAny<string?>(),
                    It.IsAny<CancellationToken>()
                )
            )
            .Returns(Task.CompletedTask);
        _unitOfWork
            .Setup(u => u.SaveChangesAsync(It.IsAny<CancellationToken>()))
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
