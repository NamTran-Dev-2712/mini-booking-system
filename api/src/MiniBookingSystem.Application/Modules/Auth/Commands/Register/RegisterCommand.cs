using MediatR;

public record RegisterCommand(
    string FullName,
    string Email,
    string Password,
    string PhoneNumber,
    string? AvatarUrl = null
) : IRequest<UserDTO>;
