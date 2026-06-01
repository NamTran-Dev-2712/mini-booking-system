using MediatR;

public class UpdateMentorStatusCommandHandler : IRequestHandler<UpdateMentorStatusCommand, Guid>
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IRefreshTokenRepository _refreshTokenRepository;
    private readonly ICacheService _cacheService;
    private readonly ILocalizationService _localizer;

    public UpdateMentorStatusCommandHandler(
        IUnitOfWork unitOfWork,
        IRefreshTokenRepository refreshTokenRepository,
        ICacheService cacheService,
        ILocalizationService localizer
    )
    {
        _unitOfWork = unitOfWork;
        _refreshTokenRepository = refreshTokenRepository;
        _cacheService = cacheService;
        _localizer = localizer;
    }

    public async Task<Guid> Handle(
        UpdateMentorStatusCommand request,
        CancellationToken cancellationToken
    )
    {
        await _unitOfWork.BeginTransactionAsync(cancellationToken);

        try
        {
            var mentor = await _unitOfWork.Mentor.GetByIdAsync(request.Id, cancellationToken);
            if (mentor is null)
                throw new NotFoundException(_localizer.GetMessage("Mentor.NotFound"));

            // Toggle public visibility (mentor entity) and the linked account's
            // ability to authenticate (ApplicationUser) together so the two never drift.
            mentor.SetActive(request.IsActive);
            await _unitOfWork.User.SetActiveAsync(
                mentor.UserId,
                request.IsActive,
                cancellationToken
            );

            await _unitOfWork.SaveChangesAsync(cancellationToken);

            // Locking takes effect immediately: revoke active sessions so the next
            // API/refresh call logs the mentor out (within access-token TTL).
            if (!request.IsActive)
                await _refreshTokenRepository.RemoveRefreshTokenAsync(mentor.UserId.ToString());

            await _unitOfWork.CommitTransactionAsync(cancellationToken);

            await _cacheService.RemoveAsync(CacheKeys.MentorDetail(mentor.Id));

            return mentor.Id;
        }
        catch (Exception)
        {
            await _unitOfWork.RollbackTransactionAsync(cancellationToken);
            throw;
        }
    }
}
