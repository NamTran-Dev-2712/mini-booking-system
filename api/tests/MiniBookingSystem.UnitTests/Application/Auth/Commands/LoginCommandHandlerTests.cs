namespace MiniBookingSystem.UnitTests.Application.Auth.Commands;

public sealed class LoginCommandHandlerTests
{
    private readonly Mock<IIdentityService> _identityService;
    private readonly LoginCommandHandler _sut;

    public LoginCommandHandlerTests()
    {
        _identityService = new Mock<IIdentityService>(MockBehavior.Strict);
        _sut = new LoginCommandHandler(_identityService.Object);
    }

    [Fact]
    public async Task Handle_WithValidCredentials_ReturnsAuthResult()
    {
        // Arrange
        var command = new LoginCommand(AuthTestData.Valid.Email, AuthTestData.Valid.Password);
        var expected = AuthTestData.BuildAuthResult();

        _identityService
            .Setup(s =>
                s.LoginAsync(command.Email, command.Password, It.IsAny<CancellationToken>())
            )
            .ReturnsAsync(expected);

        // Act
        var result = await _sut.Handle(command, CancellationToken.None);

        // Assert
        result.Should().BeEquivalentTo(expected);
    }

    [Fact]
    public async Task Handle_DelegatesExactArgumentsToIdentityService()
    {
        // Arrange
        var command = new LoginCommand(AuthTestData.Valid.Email, AuthTestData.Valid.Password);

        _identityService
            .Setup(s =>
                s.LoginAsync(command.Email, command.Password, It.IsAny<CancellationToken>())
            )
            .ReturnsAsync(AuthTestData.BuildAuthResult());

        // Act
        await _sut.Handle(command, CancellationToken.None);

        // Assert — identity service is called exactly once with the correct values
        _identityService.Verify(
            s => s.LoginAsync(command.Email, command.Password, It.IsAny<CancellationToken>()),
            Times.Once
        );
    }

    [Fact]
    public async Task Handle_WhenUserNotFound_PropagatesUnauthorizedException()
    {
        // Arrange
        var command = new LoginCommand("ghost@example.com", "P@ssword123");

        _identityService
            .Setup(s =>
                s.LoginAsync(command.Email, command.Password, It.IsAny<CancellationToken>())
            )
            .ThrowsAsync(new UnauthorizedException("Invalid email or password."));

        // Act
        var act = () => _sut.Handle(command, CancellationToken.None);

        // Assert
        await act.Should()
            .ThrowAsync<UnauthorizedException>()
            .WithMessage("Invalid email or password.");
    }

    [Fact]
    public async Task Handle_WhenPasswordIsWrong_PropagatesUnauthorizedException()
    {
        // Arrange
        var command = new LoginCommand(AuthTestData.Valid.Email, "WrongP@ssword1");

        _identityService
            .Setup(s =>
                s.LoginAsync(command.Email, command.Password, It.IsAny<CancellationToken>())
            )
            .ThrowsAsync(new UnauthorizedException("Invalid email or password."));

        // Act
        var act = () => _sut.Handle(command, CancellationToken.None);

        // Assert
        await act.Should().ThrowAsync<UnauthorizedException>();
    }
}
