using MediatR;

public class ResetPasswordCommandHandler : IRequestHandler<ResetPasswordCommand, Unit>
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly ITokenHasher _tokenHasher;
    private readonly IIdentityService _identityService;
    private readonly IRefreshTokenRepository _refreshTokenRepository;

    public ResetPasswordCommandHandler(
        IUnitOfWork unitOfWork,
        ITokenHasher tokenHasher,
        IIdentityService identityService,
        IRefreshTokenRepository refreshTokenRepository
    )
    {
        _unitOfWork = unitOfWork;
        _tokenHasher = tokenHasher;
        _identityService = identityService;
        _refreshTokenRepository = refreshTokenRepository;
    }

    public async Task<Unit> Handle(
        ResetPasswordCommand request,
        CancellationToken cancellationToken
    )
    {
        var user = await _unitOfWork.User.FindByEmailAsync(request.Email, cancellationToken);
        if (user is null)
            throw new BadRequestException("Invalid or expired reset token.");

        var tokenHash = _tokenHasher.HashToken(request.Token);
        var resetToken = await _unitOfWork.PasswordResetToken.GetByTokenHashAsync(
            tokenHash,
            cancellationToken
        );

        if (resetToken is null || resetToken.UserId != user.Id)
            throw new BadRequestException("Invalid or expired reset token.");

        if (resetToken.IsExpired)
            throw new BadRequestException("Reset token has expired. Please request a new one.");

        if (resetToken.IsConsumed)
            throw new BadRequestException("This reset token has already been used.");

        if (resetToken.Attempts >= 5)
            throw new BadRequestException(
                "Too many failed attempts. Please request a new reset token."
            );

        resetToken.Attempts++;

        var otpHash = _tokenHasher.HashToken(request.OtpCode);
        if (otpHash != resetToken.OtpCodeHash)
        {
            await _unitOfWork.SaveChangesAsync(cancellationToken);
            throw new BadRequestException("Invalid OTP code.");
        }

        await _identityService.ResetPasswordAsync(user.Id, request.NewPassword, cancellationToken);

        resetToken.ConsumedAt = DateTime.UtcNow;
        await _unitOfWork.SaveChangesAsync(cancellationToken);

        await _unitOfWork.PasswordResetToken.InvalidateAllForUserAsync(user.Id, cancellationToken);
        await _refreshTokenRepository.RemoveRefreshTokenAsync(user.Id.ToString());

        return Unit.Value;
    }
}
