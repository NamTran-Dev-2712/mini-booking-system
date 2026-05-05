namespace MiniBookingSystem.UnitTests.Application.Auth.Queries;

public sealed class GetProfileQueryHandlerTests
{
    private readonly Mock<IIdentityService> _identityService;
    private readonly Mock<ICacheService> _cacheService;
    private readonly GetProfileQueryHandler _sut;

    public GetProfileQueryHandlerTests()
    {
        _identityService = new Mock<IIdentityService>(MockBehavior.Strict);
        _cacheService = new Mock<ICacheService>(MockBehavior.Strict);
        _sut = new GetProfileQueryHandler(_identityService.Object, _cacheService.Object);
    }

    // Returns null from cache so the handler fetches from the identity service.
    private void SetupCacheMiss(Guid userId, UserDTO dto)
    {
        _cacheService
            .Setup(c => c.GetAsync<UserDTO>(CacheKeys.UserProfile(userId)))
            .ReturnsAsync((UserDTO?)null);
        _cacheService
            .Setup(c => c.SetAsync(CacheKeys.UserProfile(userId), dto, It.IsAny<TimeSpan>()))
            .Returns(Task.CompletedTask);
    }

    [Fact]
    public async Task Handle_WithExistingUserId_ReturnsUserProfile()
    {
        // Arrange
        var userId = AuthTestData.Valid.UserId;
        var query = new GetProfileQuery(userId);
        var expected = AuthTestData.BuildUserDto();

        SetupCacheMiss(userId, expected);
        _identityService
            .Setup(s => s.GetProfileAsync(userId, It.IsAny<CancellationToken>()))
            .ReturnsAsync(expected);

        // Act
        var result = await _sut.Handle(query, CancellationToken.None);

        // Assert
        result.Should().BeEquivalentTo(expected);
    }

    [Fact]
    public async Task Handle_WhenCacheHit_ReturnsCachedProfileWithoutCallingIdentityService()
    {
        // Arrange
        var userId = AuthTestData.Valid.UserId;
        var cached = AuthTestData.BuildUserDto();
        var query = new GetProfileQuery(userId);

        _cacheService
            .Setup(c => c.GetAsync<UserDTO>(CacheKeys.UserProfile(userId)))
            .ReturnsAsync(cached);

        // Act
        var result = await _sut.Handle(query, CancellationToken.None);

        // Assert
        result.Should().BeEquivalentTo(cached);
        _identityService.Verify(
            s => s.GetProfileAsync(It.IsAny<Guid>(), It.IsAny<CancellationToken>()),
            Times.Never
        );
    }

    [Fact]
    public async Task Handle_PassesExactUserIdToIdentityService()
    {
        // Arrange
        var userId = Guid.NewGuid();
        var dto = AuthTestData.BuildUserDto();
        var query = new GetProfileQuery(userId);

        SetupCacheMiss(userId, dto);
        _identityService
            .Setup(s => s.GetProfileAsync(userId, It.IsAny<CancellationToken>()))
            .ReturnsAsync(dto);

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
        var userId = Guid.NewGuid();
        var query = new GetProfileQuery(userId);

        _cacheService
            .Setup(c => c.GetAsync<UserDTO>(CacheKeys.UserProfile(userId)))
            .ReturnsAsync((UserDTO?)null);
        _identityService
            .Setup(s => s.GetProfileAsync(userId, It.IsAny<CancellationToken>()))
            .ThrowsAsync(new NotFoundException("User", userId));

        // Act
        var act = () => _sut.Handle(query, CancellationToken.None);

        // Assert
        await act.Should().ThrowAsync<NotFoundException>().WithMessage($"*User*{userId}*");
    }
}
