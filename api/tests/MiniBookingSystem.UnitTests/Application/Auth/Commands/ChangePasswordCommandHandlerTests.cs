namespace MiniBookingSystem.UnitTests.Application.Auth.Commands;

public sealed class ChangePasswordCommandHandlerTests
{
    private readonly Mock<IIdentityService> _identityService;
    private readonly ChangePasswordCommandHandler _sut;

    public ChangePasswordCommandHandlerTests()
    {
        _identityService = new Mock<IIdentityService>();
        _sut = new ChangePasswordCommandHandler(_identityService.Object);
    }

    [Fact]
    public async Task Handle_WithValidData_CallsChangePasswordAsync()
    {
        // Arrange
        var userId = Guid.NewGuid();
        var command = new ChangePasswordCommand(userId, "OldPass@123", "NewPass@456");

        _identityService
            .Setup(s =>
                s.ChangePasswordAsync(
                    userId,
                    "OldPass@123",
                    "NewPass@456",
                    It.IsAny<CancellationToken>()
                )
            )
            .Returns(Task.CompletedTask);

        // Act
        var result = await _sut.Handle(command, CancellationToken.None);

        // Assert
        result.Should().Be(MediatR.Unit.Value);
        _identityService.Verify(
            s =>
                s.ChangePasswordAsync(
                    userId,
                    "OldPass@123",
                    "NewPass@456",
                    It.IsAny<CancellationToken>()
                ),
            Times.Once
        );
    }

    [Fact]
    public async Task Handle_WhenCurrentPasswordWrong_PropagatesUnauthorizedException()
    {
        // Arrange
        var userId = Guid.NewGuid();
        var command = new ChangePasswordCommand(userId, "WrongPass@1", "NewPass@456");

        _identityService
            .Setup(s =>
                s.ChangePasswordAsync(
                    userId,
                    "WrongPass@1",
                    "NewPass@456",
                    It.IsAny<CancellationToken>()
                )
            )
            .ThrowsAsync(new UnauthorizedException("Current password is incorrect."));

        // Act
        var act = () => _sut.Handle(command, CancellationToken.None);

        // Assert
        await act.Should()
            .ThrowAsync<UnauthorizedException>()
            .WithMessage("Current password is incorrect.");
    }

    [Fact]
    public async Task Handle_WhenIdentityServiceFails_PropagatesBadRequestException()
    {
        // Arrange
        var userId = Guid.NewGuid();
        var command = new ChangePasswordCommand(userId, "OldPass@123", "weak");

        _identityService
            .Setup(s =>
                s.ChangePasswordAsync(userId, "OldPass@123", "weak", It.IsAny<CancellationToken>())
            )
            .ThrowsAsync(new BadRequestException("Failed to change password."));

        // Act
        var act = () => _sut.Handle(command, CancellationToken.None);

        // Assert
        await act.Should()
            .ThrowAsync<BadRequestException>()
            .WithMessage("Failed to change password.");
    }
}
