using MediatR;

public class UpdateMentorCommandHandler : IRequestHandler<UpdateMentorCommand, Guid>
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly ICacheService _cacheService;

    public UpdateMentorCommandHandler(IUnitOfWork unitOfWork, ICacheService cacheService)
    {
        _unitOfWork = unitOfWork;
        _cacheService = cacheService;
    }

    public async Task<Guid> Handle(UpdateMentorCommand request, CancellationToken cancellationToken)
    {
        await _unitOfWork.BeginTransactionAsync(cancellationToken);

        try
        {
            var mentor = await _unitOfWork.Mentor.GetByIdAsync(request.Id, cancellationToken);
            if (mentor is null)
                throw new NotFoundException("Mentor", request.Id.ToString());

            // FullName / PhoneNumber belong to ApplicationUser -> update with Identity (UserRepository)
            // to ensure validation and concurrency stamp of Identity are handled correctly
            if (request.FullName is not null || request.PhoneNumber is not null)
            {
                await _unitOfWork.User.UpdateUserAsync(
                    mentor.UserId,
                    request.FullName,
                    request.PhoneNumber,
                    cancellationToken
                );
            }

            mentor.Update(
                request.DisplayName,
                request.Bio,
                request.Specialization,
                request.ExperienceYears,
                request.BasePrice,
                request.AvatarUrl
            );

            await _unitOfWork.SaveChangesAsync(cancellationToken);
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
