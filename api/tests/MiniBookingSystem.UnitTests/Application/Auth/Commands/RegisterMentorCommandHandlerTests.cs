using System.Linq.Expressions;

namespace MiniBookingSystem.UnitTests.Application.Auth.Commands;

public sealed class RegisterMentorCommandHandlerTests
{
    private readonly Mock<IIdentityService> _identityService;
    private readonly Mock<IUnitOfWork> _unitOfWork;
    private readonly Mock<IMentorRepository> _mentorRepo;
    private readonly Mock<IUserRepository> _userRepo;
    private readonly Mock<IBackgroundJobService> _backgroundJobService;
    private readonly RegisterMentorCommandHandler _sut;

    public RegisterMentorCommandHandlerTests()
    {
        _identityService = new Mock<IIdentityService>(MockBehavior.Strict);
        _unitOfWork = new Mock<IUnitOfWork>(MockBehavior.Strict);
        _mentorRepo = new Mock<IMentorRepository>(MockBehavior.Strict);
        _userRepo = new Mock<IUserRepository>(MockBehavior.Strict);
        _backgroundJobService = new Mock<IBackgroundJobService>();

        _unitOfWork.Setup(u => u.Mentor).Returns(_mentorRepo.Object);
        _unitOfWork.Setup(u => u.User).Returns(_userRepo.Object);

        _sut = new RegisterMentorCommandHandler(
            _identityService.Object,
            _unitOfWork.Object,
            _backgroundJobService.Object
        );
    }

    private void SetupHappyPath(RegisterMentorCommand cmd, Guid userId)
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
                    cmd.AvatarUrl,
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
    public async Task Handle_WithValidData_ReturnsUserDTOWithMentorRole()
    {
        // Arrange
        var expectedUserId = Guid.NewGuid();
        var command = AuthTestData.BuildRegisterMentorCommand();
        SetupHappyPath(command, expectedUserId);

        // Act
        var result = await _sut.Handle(command, CancellationToken.None);

        // Assert
        result.Id.Should().Be(expectedUserId);
        result.FullName.Should().Be(command.FullName);
        result.Email.Should().Be(command.Email);
        result.PhoneNumber.Should().Be(command.PhoneNumber);
        result.Roles.Should().ContainSingle().Which.Should().Be(Roles.Mentor);
        result.CreatedAt.Should().BeCloseTo(DateTime.UtcNow, precision: TimeSpan.FromSeconds(5));
    }

    [Fact]
    public async Task Handle_CreatesMentorProfileWithDefaultFields()
    {
        // Arrange
        var userId = Guid.NewGuid();
        var command = AuthTestData.BuildRegisterMentorCommand();
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
                    command.AvatarUrl,
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
        captured.Should().NotBeNull();
        captured!.UserId.Should().Be(userId);
        captured.DisplayName.Should().Be(command.FullName);
        captured.Email.Should().Be(command.Email);
        captured.Bio.Should().BeNull();
        captured.Specialization.Should().BeNull();
        captured.ExperienceYears.Should().Be(0);
        captured.BasePrice.Should().Be(0);
    }

    [Fact]
    public async Task Handle_AssignsMentorRoleToCreatedUser()
    {
        // Arrange
        var userId = Guid.NewGuid();
        var command = AuthTestData.BuildRegisterMentorCommand();
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
        var command = AuthTestData.BuildRegisterMentorCommand();
        SetupHappyPath(command, userId);

        // Act
        await _sut.Handle(command, CancellationToken.None);

        // Assert
        _unitOfWork.Verify(
            u => u.CommitTransactionAsync(It.IsAny<CancellationToken>()),
            Times.Once
        );
    }

    [Fact]
    public async Task Handle_EnqueuesSelfWelcomeEmailAfterSuccessfulCreate()
    {
        // Arrange
        var userId = Guid.NewGuid();
        var command = AuthTestData.BuildRegisterMentorCommand();
        SetupHappyPath(command, userId);

        // Act
        await _sut.Handle(command, CancellationToken.None);

        // Assert
        _backgroundJobService.Verify(
            s => s.Enqueue<IEmailJob>(It.IsAny<Expression<Func<IEmailJob, Task>>>()),
            Times.Once
        );
    }

    // ── Failure / rollback paths ───────────────────────────────────────────

    [Fact]
    public async Task Handle_WhenIdentityServiceThrows_RollsBackTransactionAndRethrows()
    {
        // Arrange
        var command = AuthTestData.BuildRegisterMentorCommand();

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
                    It.IsAny<string?>(),
                    It.IsAny<CancellationToken>()
                )
            )
            .ThrowsAsync(new ConflictException("Email is already registered."));
        _unitOfWork
            .Setup(u => u.RollbackTransactionAsync(It.IsAny<CancellationToken>()))
            .Returns(Task.CompletedTask);

        // Act
        var act = () => _sut.Handle(command, CancellationToken.None);

        // Assert
        await act.Should().ThrowAsync<ConflictException>();
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
        var command = AuthTestData.BuildRegisterMentorCommand();

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
                    command.AvatarUrl,
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
    public async Task Handle_WhenExceptionOccurs_NeverCommitsAndDoesNotEnqueueEmail()
    {
        // Arrange
        var command = AuthTestData.BuildRegisterMentorCommand();

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
                    It.IsAny<string?>(),
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
        _backgroundJobService.Verify(
            s => s.Enqueue<IEmailJob>(It.IsAny<Expression<Func<IEmailJob, Task>>>()),
            Times.Never
        );
    }
}
