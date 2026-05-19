using MediatR;

public class GoogleLoginCommandHandler : IRequestHandler<GoogleLoginCommand, AuthResult>
{
    private readonly IIdentityService _identityService;

    public GoogleLoginCommandHandler(IIdentityService identityService)
    {
        _identityService = identityService;
    }

    public Task<AuthResult> Handle(GoogleLoginCommand request, CancellationToken cancellationToken)
    {
        return _identityService.GoogleLoginAsync(
            request.Email,
            request.Name,
            request.AvatarUrl,
            request.GoogleUserId,
            cancellationToken
        );
    }
}
