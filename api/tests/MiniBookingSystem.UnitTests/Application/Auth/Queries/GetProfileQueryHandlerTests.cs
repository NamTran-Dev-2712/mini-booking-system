namespace MiniBookingSystem.UnitTests.Application.Auth.Queries;

public sealed class GetProfileQueryHandlerTests
{
    private readonly Mock<IIdentityService> _identityService;
    private readonly GetProfileQueryHandler _sut;

    public GetProfileQueryHandlerTests()
    {
        _identityService = new Mock<IIdentityService>(MockBehavior.Strict);
        _sut = new GetProfileQueryHandler(_identityService.Object);
    }

    [Fact]
    public async Task Handle_WithExistingUserId_ReturnsUserProfile()
    {
        // Arrange
        var userId = AuthTestData.Valid.UserId.ToString();
        var query = new GetProfileQuery(userId);
        var expected = AuthTestData.BuildUserDto();

        _identityService
            .Setup(s => s.GetProfileAsync(userId, It.IsAny<CancellationToken>()))
            .ReturnsAsync(expected);

        // Act
        var result = await _sut.Handle(query, CancellationToken.None);

        // Assert
        result.Should().BeEquivalentTo(expected);
    }

    [Fact]
    public async Task Handle_PassesExactUserIdToIdentityService()
    {
        // Arrange
        var userId = Guid.NewGuid().ToString();
        var query = new GetProfileQuery(userId);

        _identityService
            .Setup(s => s.GetProfileAsync(userId, It.IsAny<CancellationToken>()))
            .ReturnsAsync(AuthTestData.BuildUserDto());

        // Act
        await _sut.Handle(query, CancellationToken.None);

        // Assert
        _identityService.Verify(
            s => s.GetProfileAsync(userId, It.IsAny<CancellationToken>()),
            Times.Once
        );
    }

    [Fact]
    public async Task Handle_WhenUserDoesNotExist_PropagatesNotFoundException()
    {
        // Arrange
        var userId = Guid.NewGuid().ToString();
        var query = new GetProfileQuery(userId);

        _identityService
            .Setup(s => s.GetProfileAsync(userId, It.IsAny<CancellationToken>()))
            .ThrowsAsync(new NotFoundException("User", userId));

        // Act
        var act = () => _sut.Handle(query, CancellationToken.None);

        // Assert
        await act.Should().ThrowAsync<NotFoundException>().WithMessage($"*User*{userId}*");
    }
}
