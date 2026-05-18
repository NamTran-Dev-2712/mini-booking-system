using MediatR;

public record ResetPasswordCommand(string Email, string Token, string OtpCode, string NewPassword)
    : IRequest<Unit>;
