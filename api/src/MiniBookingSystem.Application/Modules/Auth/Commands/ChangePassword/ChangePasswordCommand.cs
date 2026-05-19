using MediatR;

public record ChangePasswordCommand(Guid UserId, string CurrentPassword, string NewPassword)
    : IRequest<Unit>;
