using System.Security.Cryptography;
using System.Web;
using MediatR;
using Microsoft.Extensions.Configuration;

public class ForgotPasswordCommandHandler : IRequestHandler<ForgotPasswordCommand, Unit>
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly ITokenHasher _tokenHasher;
    private readonly IBackgroundJobService _backgroundJobService;
    private readonly IConfiguration _configuration;

    public ForgotPasswordCommandHandler(
        IUnitOfWork unitOfWork,
        ITokenHasher tokenHasher,
        IBackgroundJobService backgroundJobService,
        IConfiguration configuration
    )
    {
        _unitOfWork = unitOfWork;
        _tokenHasher = tokenHasher;
        _backgroundJobService = backgroundJobService;
        _configuration = configuration;
    }

    public async Task<Unit> Handle(
        ForgotPasswordCommand request,
        CancellationToken cancellationToken
    )
    {
        var user = await _unitOfWork.User.FindByEmailAsync(request.Email, cancellationToken);

        // Don't reveal if the email exists or not
        if (user is null)
            return Unit.Value;

        // Invalidate existing tokens for the user
        await _unitOfWork.PasswordResetToken.InvalidateAllForUserAsync(user.Id, cancellationToken);

        var tokenBytes = RandomNumberGenerator.GetBytes(32);
        var token = Convert
            .ToBase64String(tokenBytes)
            .Replace("+", "-")
            .Replace("/", "_")
            .TrimEnd('=');

        var otp = RandomNumberGenerator.GetInt32(100000, 999999).ToString();

        var tokenHash = _tokenHasher.HashToken(token);
        var otpHash = _tokenHasher.HashToken(otp);

        var resetToken = new PasswordResetToken
        {
            UserId = user.Id,
            TokenHash = tokenHash,
            OtpCodeHash = otpHash,
            ExpiresAt = DateTime.UtcNow.AddMinutes(15),
        };

        await _unitOfWork.PasswordResetToken.AddAsync(resetToken, cancellationToken);
        await _unitOfWork.SaveChangesAsync(cancellationToken);

        var frontendUrl = _configuration[ConfigurationValue.BaseUrlFrontend];
        var resetUrl =
            $"{frontendUrl}/reset-password?token={HttpUtility.UrlEncode(token)}&email={HttpUtility.UrlEncode(request.Email)}";

        _backgroundJobService.Enqueue<IEmailJob>(job =>
            job.SendPasswordResetEmailAsync(request.Email, user.FullName, otp, resetUrl)
        );

        return Unit.Value;
    }
}
