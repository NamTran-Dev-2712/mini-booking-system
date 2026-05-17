using MediatR;
using Microsoft.AspNetCore.OutputCaching;
using MiniBookingSystem.Application.Common.Constants;

public class UpdateProfileCommandHandler : IRequestHandler<UpdateProfileCommand, Unit>
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly ICacheService _cacheService;
    private readonly IOutputCacheStore _outputCacheStore;

    public UpdateProfileCommandHandler(
        IUnitOfWork unitOfWork,
        ICacheService cacheService,
        IOutputCacheStore outputCacheStore
    )
    {
        _unitOfWork = unitOfWork;
        _cacheService = cacheService;
        _outputCacheStore = outputCacheStore;
    }

    public async Task<Unit> Handle(
        UpdateProfileCommand request,
        CancellationToken cancellationToken
    )
    {
        var isMentor = request.Roles.Contains(ApplicationRoles.Mentor);

        if (isMentor)
        {
            await _unitOfWork.BeginTransactionAsync(cancellationToken);

            try
            {
                if (request.FullName is not null || request.PhoneNumber is not null)
                {
                    await _unitOfWork.User.UpdateUserAsync(
                        request.UserId,
                        request.FullName,
                        request.PhoneNumber,
                        cancellationToken
                    );
                }

                var mentor = await _unitOfWork.Mentor.GetByUserIdAsync(
                    request.UserId,
                    cancellationToken
                );
                if (mentor is null)
                    throw new NotFoundException("Mentor profile", request.UserId.ToString());

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

                await _cacheService.RemoveAsync(CacheKeys.UserProfile(request.UserId));
                await _cacheService.RemoveAsync(CacheKeys.MentorDetail(mentor.Id));
                await _outputCacheStore.EvictByTagAsync(
                    CacheKeys.PublicListMentorTag,
                    cancellationToken
                );
            }
            catch (Exception)
            {
                await _unitOfWork.RollbackTransactionAsync(cancellationToken);
                throw;
            }
        }
        else
        {
            if (request.FullName is not null || request.PhoneNumber is not null)
            {
                await _unitOfWork.User.UpdateUserAsync(
                    request.UserId,
                    request.FullName,
                    request.PhoneNumber,
                    cancellationToken
                );
            }

            await _cacheService.RemoveAsync(CacheKeys.UserProfile(request.UserId));
        }

        return Unit.Value;
    }
}
