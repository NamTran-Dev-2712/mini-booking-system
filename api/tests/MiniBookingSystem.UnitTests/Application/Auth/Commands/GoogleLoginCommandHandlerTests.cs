namespace MiniBookingSystem.UnitTests.Application.Auth.Commands;

public sealed class GoogleLoginCommandHandlerTests
{
    private readonly Mock<IIdentityService> _identityService;
    private readonly GoogleLoginCommandHandler _sut;

    public GoogleLoginCommandHandlerTests()
    {
        _identityService = new Mock<IIdentityService>(MockBehavior.Strict);
        _sut = new GoogleLoginCommandHandler(_identityService.Object);
    }

    [Fact]
    public async Task Handle_NewUser_ReturnsAuthResultWithRequiresProfileCompletion()
    {
        // Arrange
        var command = new GoogleLoginCommand(
            "newuser@gmail.com",
            "New User",
            "https://lh3.googleusercontent.com/photo.jpg",
            "google-id-123"
        );

        var expected = AuthTestData.BuildAuthResult() with
        {
            RequiresProfileCompletion = true,
            PhoneNumber = "",
        };

        _identityService
            .Setup(s =>
                s.GoogleLoginAsync(
                    command.Email,
                    command.Name,
                    command.AvatarUrl,
                    command.GoogleUserId,
                    It.IsAny<CancellationToken>()
                )
            )
            .ReturnsAsync(expected);

        // Act
        var result = await _sut.Handle(command, CancellationToken.None);

        // Assert
        result.RequiresProfileCompletion.Should().BeTrue();
    }

    [Fact]
    public async Task Handle_ExistingUserWithPhone_ReturnsAuthResultWithoutProfileCompletion()
    {
        // Arrange
        var command = new GoogleLoginCommand(
            "existing@gmail.com",
            "Existing User",
            null,
            "google-id-456"
        );

        var expected = AuthTestData.BuildAuthResult() with { RequiresProfileCompletion = false };

        _identityService
            .Setup(s =>
                s.GoogleLoginAsync(
                    command.Email,
                    command.Name,
                    command.AvatarUrl,
                    command.GoogleUserId,
                    It.IsAny<CancellationToken>()
                )
            )
            .ReturnsAsync(expected);

        // Act
        var result = await _sut.Handle(command, CancellationToken.None);

        // Assert
        result.RequiresProfileCompletion.Should().BeFalse();
    }

    [Fact]
    public async Task Handle_DelegatesCorrectArgumentsToIdentityService()
    {
        // Arrange
        var command = new GoogleLoginCommand(
            "test@gmail.com",
            "Test User",
            "https://avatar.url",
            "google-sub-789"
        );

        _identityService
            .Setup(s =>
                s.GoogleLoginAsync(
                    command.Email,
                    command.Name,
                    command.AvatarUrl,
                    command.GoogleUserId,
                    It.IsAny<CancellationToken>()
                )
            )
            .ReturnsAsync(AuthTestData.BuildAuthResult());

        // Act
        await _sut.Handle(command, CancellationToken.None);

        // Assert
        _identityService.Verify(
            s =>
                s.GoogleLoginAsync(
                    "test@gmail.com",
                    "Test User",
                    "https://avatar.url",
                    "google-sub-789",
                    It.IsAny<CancellationToken>()
                ),
            Times.Once
        );
    }
}
