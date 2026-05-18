namespace MiniBookingSystem.UnitTests.Application.Auth.Commands;

public sealed class RegisterCommandHandlerTests
{
    private readonly Mock<IIdentityService> _identityService;
    private readonly RegisterCommandHandler _sut;

    public RegisterCommandHandlerTests()
    {
        _identityService = new Mock<IIdentityService>(MockBehavior.Strict);
        _sut = new RegisterCommandHandler(_identityService.Object);
    }

    // ── Success path ───────────────────────────────────────────────────────

    [Fact]
    public async Task Handle_WithValidData_ReturnsUserDTOWithMatchingFields()
    {
        // Arrange
        var newUserId = Guid.NewGuid();
        var command = new RegisterCommand(
            AuthTestData.Valid.FullName,
            AuthTestData.Valid.Email,
            AuthTestData.Valid.Password,
            AuthTestData.Valid.PhoneNumber
        );

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
            .ReturnsAsync(newUserId);

        // Act
        var result = await _sut.Handle(command, CancellationToken.None);

        // Assert
        result.Id.Should().Be(newUserId);
        result.FullName.Should().Be(command.FullName);
        result.Email.Should().Be(command.Email);
        result.PhoneNumber.Should().Be(command.PhoneNumber);
        result.CreatedAt.Should().BeCloseTo(DateTime.UtcNow, precision: TimeSpan.FromSeconds(5));
    }

    [Fact]
    public async Task Handle_CallsIdentityServiceWithExactCommandValues()
    {
        // Arrange
        var command = new RegisterCommand(
            AuthTestData.Valid.FullName,
            AuthTestData.Valid.Email,
            AuthTestData.Valid.Password,
            AuthTestData.Valid.PhoneNumber
        );

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
            .ReturnsAsync(Guid.NewGuid());

        // Act
        await _sut.Handle(command, CancellationToken.None);

        // Assert
        _identityService.Verify(
            s =>
                s.RegisterAsync(
                    command.FullName,
                    command.Email,
                    command.Password,
                    command.PhoneNumber,
                    command.AvatarUrl,
                    It.IsAny<CancellationToken>()
                ),
            Times.Once
        );
    }

    // ── Conflict paths ─────────────────────────────────────────────────────

    [Fact]
    public async Task Handle_WhenEmailAlreadyRegistered_PropagatesConflictException()
    {
        // Arrange
        var command = new RegisterCommand(
            AuthTestData.Valid.FullName,
            "duplicate@example.com",
            AuthTestData.Valid.Password,
            AuthTestData.Valid.PhoneNumber
        );

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

        // Act
        var act = () => _sut.Handle(command, CancellationToken.None);

        // Assert
        await act.Should()
            .ThrowAsync<ConflictException>()
            .WithMessage("Email is already registered.");
    }

    [Fact]
    public async Task Handle_WhenPhoneAlreadyRegistered_PropagatesConflictException()
    {
        // Arrange
        var command = new RegisterCommand(
            AuthTestData.Valid.FullName,
            AuthTestData.Valid.Email,
            AuthTestData.Valid.Password,
            "0912345678"
        );

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
            .ThrowsAsync(new ConflictException("Phone number is already registered."));

        // Act
        var act = () => _sut.Handle(command, CancellationToken.None);

        // Assert
        await act.Should()
            .ThrowAsync<ConflictException>()
            .WithMessage("Phone number is already registered.");
    }
}
