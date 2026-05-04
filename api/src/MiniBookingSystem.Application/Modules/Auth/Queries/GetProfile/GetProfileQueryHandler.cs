using MediatR;

public class GetProfileQueryHandler : IRequestHandler<GetProfileQuery, UserDTO>
{
    private readonly IIdentityService _identityService;
    private readonly ICacheService _cacheService;

    public GetProfileQueryHandler(IIdentityService identityService, ICacheService cacheService)
    {
        _identityService = identityService;
        _cacheService = cacheService;
    }

    public async Task<UserDTO> Handle(GetProfileQuery request, CancellationToken cancellationToken)
    {
        var key = CacheKeys.UserProfile(request.UserId);
        var cached = await _cacheService.GetAsync<UserDTO>(key);
        if (cached != null)
            return cached;

        var userProfile = await _identityService.GetProfileAsync(request.UserId, cancellationToken);

        await _cacheService.SetAsync(key, userProfile, TimeSpan.FromMinutes(10));

        return userProfile;
    }
}
