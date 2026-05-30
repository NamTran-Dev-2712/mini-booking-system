using MediatR;

public record RegisterMentorCommand(
    string FullName,
    string Email,
    string Password,
    string PhoneNumber,
    string? AvatarUrl = null
) : IRequest<UserDTO>;
