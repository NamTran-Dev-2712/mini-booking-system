using MediatR;

public class CompleteProfileCommandHandler : IRequestHandler<CompleteProfileCommand>
{
    private readonly IIdentityService _identityService;

    public CompleteProfileCommandHandler(IIdentityService identityService)
    {
        _identityService = identityService;
    }

    public async Task Handle(CompleteProfileCommand request, CancellationToken cancellationToken)
    {
        await _identityService.CompleteProfileAsync(
            request.UserId,
            request.PhoneNumber,
            cancellationToken
        );
    }
}
