using MediatR;

public class ResetPasswordCommandHandler : IRequestHandler<ResetPasswordCommand, Unit>
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly ITokenHasher _tokenHasher;
    private readonly IIdentityService _identityService;
    private readonly IRefreshTokenRepository _refreshTokenRepository;
    private readonly ILocalizationService _localizer;

    public ResetPasswordCommandHandler(
        IUnitOfWork unitOfWork,
        ITokenHasher tokenHasher,
        IIdentityService identityService,
        IRefreshTokenRepository refreshTokenRepository,
        ILocalizationService localizer
    )
    {
        _unitOfWork = unitOfWork;
        _tokenHasher = tokenHasher;
        _identityService = identityService;
        _refreshTokenRepository = refreshTokenRepository;
        _localizer = localizer;
    }

    public async Task<Unit> Handle(
        ResetPasswordCommand request,
        CancellationToken cancellationToken
    )
    {
        var user = await _unitOfWork.User.FindByEmailAsync(request.Email, cancellationToken);
        if (user is null)
            throw new BadRequestException(_localizer.GetMessage("Auth.InvalidResetToken"));

        var tokenHash = _tokenHasher.HashToken(request.Token);
        var resetToken = await _unitOfWork.PasswordResetToken.GetByTokenHashAsync(
            tokenHash,
            cancellationToken
        );

        if (resetToken is null || resetToken.UserId != user.Id)
            throw new BadRequestException(_localizer.GetMessage("Auth.InvalidResetToken"));

        if (resetToken.IsExpired)
            throw new BadRequestException(_localizer.GetMessage("Auth.ResetTokenExpired"));

        if (resetToken.IsConsumed)
            throw new BadRequestException(_localizer.GetMessage("Auth.ResetTokenUsed"));

        if (resetToken.Attempts >= 5)
            throw new BadRequestException(
                "Too many failed attempts. Please request a new reset token."
            );

        resetToken.Attempts++;

        var otpHash = _tokenHasher.HashToken(request.OtpCode);
        if (otpHash != resetToken.OtpCodeHash)
        {
            await _unitOfWork.SaveChangesAsync(cancellationToken);
            throw new BadRequestException(_localizer.GetMessage("Auth.InvalidOtp"));
        }

        await _identityService.ResetPasswordAsync(user.Id, request.NewPassword, cancellationToken);

        resetToken.ConsumedAt = DateTime.UtcNow;
        await _unitOfWork.SaveChangesAsync(cancellationToken);

        await _unitOfWork.PasswordResetToken.InvalidateAllForUserAsync(user.Id, cancellationToken);
        await _refreshTokenRepository.RemoveRefreshTokenAsync(user.Id.ToString());

        return Unit.Value;
    }
}
