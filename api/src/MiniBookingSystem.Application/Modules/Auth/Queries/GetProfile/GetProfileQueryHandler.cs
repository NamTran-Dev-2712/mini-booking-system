using MediatR;

public class GetProfileQueryHandler : IRequestHandler<GetProfileQuery, UserDTO>
{
    private readonly IIdentityService _identityService;

    public GetProfileQueryHandler(IIdentityService identityService)
    {
        _identityService = identityService;
    }

    public async Task<UserDTO> Handle(GetProfileQuery request, CancellationToken cancellationToken)
    {
        var userProfile = await _identityService.GetProfileAsync(request.UserId, cancellationToken);

        return userProfile;
    }
}
