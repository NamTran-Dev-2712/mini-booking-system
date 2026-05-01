namespace MiniBookingSystem.UnitTests.Application.Auth.Commands;

public sealed class RefreshTokenCommandHandlerTests
{
    private readonly Mock<IIdentityService> _identityService;
    private readonly RefreshTokenCommandHandler _sut;

    public RefreshTokenCommandHandlerTests()
    {
        _identityService = new Mock<IIdentityService>(MockBehavior.Strict);
        _sut = new RefreshTokenCommandHandler(_identityService.Object);
    }

    [Fact]
    public async Task Handle_WithValidToken_ReturnsNewAuthResult()
    {
        // Arrange
        const string token = "valid-refresh-token";
        var command = new RefreshTokenCommand(token);
        var expected = AuthTestData.BuildAuthResult();

        _identityService
            .Setup(s => s.RefreshTokenAsync(token, It.IsAny<CancellationToken>()))
            .ReturnsAsync(expected);

        // Act
        var result = await _sut.Handle(command, CancellationToken.None);

        // Assert
        result.Should().BeEquivalentTo(expected);
    }

    [Fact]
    public async Task Handle_PassesExactTokenToIdentityService()
    {
        // Arrange
        const string token = "specific-token-value";
        var command = new RefreshTokenCommand(token);

        _identityService
            .Setup(s => s.RefreshTokenAsync(token, It.IsAny<CancellationToken>()))
            .ReturnsAsync(AuthTestData.BuildAuthResult());

        // Act
        await _sut.Handle(command, CancellationToken.None);

        // Assert
        _identityService.Verify(
            s => s.RefreshTokenAsync(token, It.IsAny<CancellationToken>()),
            Times.Once
        );
    }

    [Fact]
    public async Task Handle_WhenTokenIsInvalid_PropagatesUnauthorizedException()
    {
        // Arrange
        var command = new RefreshTokenCommand("expired-or-invalid-token");

        _identityService
            .Setup(s => s.RefreshTokenAsync(It.IsAny<string>(), It.IsAny<CancellationToken>()))
            .ThrowsAsync(new UnauthorizedException("Invalid refresh token."));

        // Act
        var act = () => _sut.Handle(command, CancellationToken.None);

        // Assert
        await act.Should()
            .ThrowAsync<UnauthorizedException>()
            .WithMessage("Invalid refresh token.");
    }
}
