using MediatR;

public class DeleteMentorCommandHandler : IRequestHandler<DeleteMentorCommand, Unit>
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly ICacheService _cacheService;
    private readonly ILocalizationService _localizer;

    public DeleteMentorCommandHandler(
        IUnitOfWork unitOfWork,
        ICacheService cacheService,
        ILocalizationService localizer
    )
    {
        _unitOfWork = unitOfWork;
        _cacheService = cacheService;
        _localizer = localizer;
    }

    public async Task<Unit> Handle(DeleteMentorCommand request, CancellationToken cancellationToken)
    {
        var mentor = await _unitOfWork.Mentor.GetByIdAsync(request.MentorId, cancellationToken);
        if (mentor is null)
            throw new NotFoundException(_localizer.GetMessage("Mentor.NotFound"));

        // start a transaction to ensure both mentor and user are deleted successfully
        await _unitOfWork.BeginTransactionAsync(cancellationToken);

        try
        {
            // delete the mentor (soft delete)
            mentor.IsDeleted = true;
            mentor.Email = "deleted_" + mentor.Email + "_" + mentor.Id; // anonymize email to prevent conflicts
            mentor.DeletedAt = DateTime.UtcNow;
            _unitOfWork.Mentor.Update(mentor);

            // delete the associated user
            await _unitOfWork.User.DeleteUserAsync(mentor.UserId, cancellationToken);

            await _unitOfWork.SaveChangesAsync(cancellationToken);
            await _unitOfWork.CommitTransactionAsync(cancellationToken);

            await _cacheService.RemoveAsync(CacheKeys.MentorDetail(mentor.Id));

            return Unit.Value;
        }
        catch (Exception)
        {
            await _unitOfWork.RollbackTransactionAsync(cancellationToken);
            throw;
        }
    }
}
