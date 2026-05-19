namespace MiniBookingSystem.UnitTests.Application.Auth.Commands;

public sealed class CompleteProfileCommandHandlerTests
{
    private readonly Mock<IIdentityService> _identityService;
    private readonly CompleteProfileCommandHandler _sut;

    public CompleteProfileCommandHandlerTests()
    {
        _identityService = new Mock<IIdentityService>(MockBehavior.Strict);
        _sut = new CompleteProfileCommandHandler(_identityService.Object);
    }

    [Fact]
    public async Task Handle_WithValidData_CallsCompleteProfileAsync()
    {
        // Arrange
        var command = new CompleteProfileCommand(AuthTestData.Valid.UserId, "0912345678");

        _identityService
            .Setup(s =>
                s.CompleteProfileAsync(
                    command.UserId,
                    command.PhoneNumber,
                    It.IsAny<CancellationToken>()
                )
            )
            .Returns(Task.CompletedTask);

        // Act
        await _sut.Handle(command, CancellationToken.None);

        // Assert
        _identityService.Verify(
            s =>
                s.CompleteProfileAsync(command.UserId, "0912345678", It.IsAny<CancellationToken>()),
            Times.Once
        );
    }

    [Fact]
    public async Task Handle_WhenPhoneTaken_ThrowsConflictException()
    {
        // Arrange
        var command = new CompleteProfileCommand(AuthTestData.Valid.UserId, "0912345678");

        _identityService
            .Setup(s =>
                s.CompleteProfileAsync(
                    command.UserId,
                    command.PhoneNumber,
                    It.IsAny<CancellationToken>()
                )
            )
            .ThrowsAsync(new ConflictException("Phone number is already registered."));

        // Act
        var act = () => _sut.Handle(command, CancellationToken.None);

        // Assert
        await act.Should().ThrowAsync<ConflictException>();
    }
}
