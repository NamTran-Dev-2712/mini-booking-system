using MediatR;

public class RegisterCommandHandler : IRequestHandler<RegisterCommand, UserDTO>
{
    private readonly IIdentityService _identityService;

    public RegisterCommandHandler(IIdentityService identityService)
    {
        _identityService = identityService;
    }

    public async Task<UserDTO> Handle(RegisterCommand request, CancellationToken cancellationToken)
    {
        var userId = await _identityService.RegisterAsync(
            request.FullName,
            request.Email,
            request.Password,
            request.PhoneNumber,
            cancellationToken
        );

        return new UserDTO(
            Id: userId,
            FullName: request.FullName,
            Email: request.Email,
            PhoneNumber: request.PhoneNumber,
            CreatedAt: DateTime.UtcNow,
            Roles: ["User"]
        );
    }
}
