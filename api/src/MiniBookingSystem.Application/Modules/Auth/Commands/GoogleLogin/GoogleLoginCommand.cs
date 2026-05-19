using MediatR;

public record GoogleLoginCommand(string Email, string? Name, string? AvatarUrl, string GoogleUserId)
    : IRequest<AuthResult>;
