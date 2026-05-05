namespace MiniBookingSystem.UnitTests.Application.Mentor.Commands;

public sealed class CreateMentorCommandHandlerTests
{
    private readonly Mock<IIdentityService> _identityService;
    private readonly Mock<IUnitOfWork> _unitOfWork;
    private readonly Mock<IMentorRepository> _mentorRepo;
    private readonly Mock<IUserRepository> _userRepo;
    private readonly CreateMentorCommandHandler _sut;

    public CreateMentorCommandHandlerTests()
    {
        _identityService = new Mock<IIdentityService>(MockBehavior.Strict);
        _unitOfWork = new Mock<IUnitOfWork>(MockBehavior.Strict);
        _mentorRepo = new Mock<IMentorRepository>(MockBehavior.Strict);
        _userRepo = new Mock<IUserRepository>(MockBehavior.Strict);

        _unitOfWork.Setup(u => u.Mentor).Returns(_mentorRepo.Object);
        _unitOfWork.Setup(u => u.User).Returns(_userRepo.Object);

        _sut = new CreateMentorCommandHandler(_identityService.Object, _unitOfWork.Object);
    }

    private void SetupHappyPath(CreateMentorCommand cmd, Guid userId)
    {
        _unitOfWork
            .Setup(u => u.BeginTransactionAsync(It.IsAny<CancellationToken>()))
            .Returns(Task.CompletedTask);

        _identityService
            .Setup(s =>
                s.RegisterAsync(
                    cmd.FullName,
                    cmd.Email,
                    cmd.Password,
                    cmd.PhoneNumber,
                    It.IsAny<CancellationToken>()
                )
            )
            .ReturnsAsync(userId);

        _userRepo
            .Setup(r => r.UpdateRoleAsync(userId, Roles.Mentor, It.IsAny<CancellationToken>()))
            .ReturnsAsync(userId);

        _mentorRepo
            .Setup(r => r.AddAsync(It.IsAny<global::Mentor>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync((global::Mentor m, CancellationToken _) => m);

        _unitOfWork.Setup(u => u.SaveChangesAsync(It.IsAny<CancellationToken>())).ReturnsAsync(1);

        _unitOfWork
            .Setup(u => u.CommitTransactionAsync(It.IsAny<CancellationToken>()))
            .Returns(Task.CompletedTask);
    }

    // ── Success path ───────────────────────────────────────────────────────

    [Fact]
    public async Task Handle_WithValidData_ReturnsUserIdFromIdentityService()
    {
        // Arrange
        var expectedUserId = Guid.NewGuid();
        var command = MentorTestData.BuildCreateMentorCommand();
        SetupHappyPath(command, expectedUserId);

        // Act
        var result = await _sut.Handle(command, CancellationToken.None);

        // Assert
        result.Should().Be(expectedUserId);
    }

    [Fact]
    public async Task Handle_WhenDisplayNameIsNull_UsesFullNameForMentor()
    {
        // Arrange
        var userId = Guid.NewGuid();
        var command = MentorTestData.BuildCreateMentorCommand(displayName: null);
        global::Mentor? captured = null;

        _unitOfWork
            .Setup(u => u.BeginTransactionAsync(It.IsAny<CancellationToken>()))
            .Returns(Task.CompletedTask);
        _identityService
            .Setup(s =>
                s.RegisterAsync(
                    command.FullName,
                    command.Email,
                    command.Password,
                    command.PhoneNumber,
                    It.IsAny<CancellationToken>()
                )
            )
            .ReturnsAsync(userId);
        _userRepo
            .Setup(r => r.UpdateRoleAsync(userId, Roles.Mentor, It.IsAny<CancellationToken>()))
            .ReturnsAsync(userId);
        _mentorRepo
            .Setup(r => r.AddAsync(It.IsAny<global::Mentor>(), It.IsAny<CancellationToken>()))
            .Callback<global::Mentor, CancellationToken>((m, _) => captured = m)
            .ReturnsAsync((global::Mentor m, CancellationToken _) => m);
        _unitOfWork.Setup(u => u.SaveChangesAsync(It.IsAny<CancellationToken>())).ReturnsAsync(1);
        _unitOfWork
            .Setup(u => u.CommitTransactionAsync(It.IsAny<CancellationToken>()))
            .Returns(Task.CompletedTask);

        // Act
        await _sut.Handle(command, CancellationToken.None);

        // Assert
        captured!.DisplayName.Should().Be(command.FullName);
    }

    [Fact]
    public async Task Handle_WhenDisplayNameIsProvided_UsesThatDisplayName()
    {
        // Arrange
        const string customDisplay = "Dr. Minh";
        var userId = Guid.NewGuid();
        var command = MentorTestData.BuildCreateMentorCommand(displayName: customDisplay);
        global::Mentor? captured = null;

        _unitOfWork
            .Setup(u => u.BeginTransactionAsync(It.IsAny<CancellationToken>()))
            .Returns(Task.CompletedTask);
        _identityService
            .Setup(s =>
                s.RegisterAsync(
                    command.FullName,
                    command.Email,
                    command.Password,
                    command.PhoneNumber,
                    It.IsAny<CancellationToken>()
                )
            )
            .ReturnsAsync(userId);
        _userRepo
            .Setup(r => r.UpdateRoleAsync(userId, Roles.Mentor, It.IsAny<CancellationToken>()))
            .ReturnsAsync(userId);
        _mentorRepo
            .Setup(r => r.AddAsync(It.IsAny<global::Mentor>(), It.IsAny<CancellationToken>()))
            .Callback<global::Mentor, CancellationToken>((m, _) => captured = m)
            .ReturnsAsync((global::Mentor m, CancellationToken _) => m);
        _unitOfWork.Setup(u => u.SaveChangesAsync(It.IsAny<CancellationToken>())).ReturnsAsync(1);
        _unitOfWork
            .Setup(u => u.CommitTransactionAsync(It.IsAny<CancellationToken>()))
            .Returns(Task.CompletedTask);

        // Act
        await _sut.Handle(command, CancellationToken.None);

        // Assert
        captured!.DisplayName.Should().Be(customDisplay);
    }

    [Fact]
    public async Task Handle_AssignsMentorRoleToCreatedUser()
    {
        // Arrange
        var userId = Guid.NewGuid();
        var command = MentorTestData.BuildCreateMentorCommand();
        SetupHappyPath(command, userId);

        // Act
        await _sut.Handle(command, CancellationToken.None);

        // Assert
        _userRepo.Verify(
            r => r.UpdateRoleAsync(userId, Roles.Mentor, It.IsAny<CancellationToken>()),
            Times.Once
        );
    }

    [Fact]
    public async Task Handle_CommitsTransactionAfterSuccessfulCreate()
    {
        // Arrange
        var userId = Guid.NewGuid();
        var command = MentorTestData.BuildCreateMentorCommand();
        SetupHappyPath(command, userId);

        // Act
        await _sut.Handle(command, CancellationToken.None);

        // Assert
        _unitOfWork.Verify(
            u => u.CommitTransactionAsync(It.IsAny<CancellationToken>()),
            Times.Once
        );
    }

    // ── Failure / rollback paths ───────────────────────────────────────────

    [Fact]
    public async Task Handle_WhenIdentityServiceThrows_RollsBackTransactionAndRethrows()
    {
        // Arrange
        var command = MentorTestData.BuildCreateMentorCommand();

        _unitOfWork
            .Setup(u => u.BeginTransactionAsync(It.IsAny<CancellationToken>()))
            .Returns(Task.CompletedTask);
        _identityService
            .Setup(s =>
                s.RegisterAsync(
                    It.IsAny<string>(),
                    It.IsAny<string>(),
                    It.IsAny<string>(),
                    It.IsAny<string>(),
                    It.IsAny<CancellationToken>()
                )
            )
            .ThrowsAsync(new InvalidOperationException("Registration failed"));
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
    }

    [Fact]
    public async Task Handle_WhenSaveChangesThrows_RollsBackTransactionAndRethrows()
    {
        // Arrange
        var userId = Guid.NewGuid();
        var command = MentorTestData.BuildCreateMentorCommand();

        _unitOfWork
            .Setup(u => u.BeginTransactionAsync(It.IsAny<CancellationToken>()))
            .Returns(Task.CompletedTask);
        _identityService
            .Setup(s =>
                s.RegisterAsync(
                    command.FullName,
                    command.Email,
                    command.Password,
                    command.PhoneNumber,
                    It.IsAny<CancellationToken>()
                )
            )
            .ReturnsAsync(userId);
        _userRepo
            .Setup(r => r.UpdateRoleAsync(userId, Roles.Mentor, It.IsAny<CancellationToken>()))
            .ReturnsAsync(userId);
        _mentorRepo
            .Setup(r => r.AddAsync(It.IsAny<global::Mentor>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync((global::Mentor m, CancellationToken _) => m);
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
    }

    [Fact]
    public async Task Handle_WhenExceptionOccurs_NeverCommitsTransaction()
    {
        // Arrange
        var command = MentorTestData.BuildCreateMentorCommand();

        _unitOfWork
            .Setup(u => u.BeginTransactionAsync(It.IsAny<CancellationToken>()))
            .Returns(Task.CompletedTask);
        _identityService
            .Setup(s =>
                s.RegisterAsync(
                    It.IsAny<string>(),
                    It.IsAny<string>(),
                    It.IsAny<string>(),
                    It.IsAny<string>(),
                    It.IsAny<CancellationToken>()
                )
            )
            .ThrowsAsync(new Exception("Unexpected error"));
        _unitOfWork
            .Setup(u => u.RollbackTransactionAsync(It.IsAny<CancellationToken>()))
            .Returns(Task.CompletedTask);

        // Act
        var act = () => _sut.Handle(command, CancellationToken.None);
        await act.Should().ThrowAsync<Exception>();

        // Assert
        _unitOfWork.Verify(
            u => u.CommitTransactionAsync(It.IsAny<CancellationToken>()),
            Times.Never
        );
    }
}
