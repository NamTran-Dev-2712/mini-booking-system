using MediatR;

public class RemoveSkillMentorCommandHandler : IRequestHandler<RemoveSkillMentorCommand, Unit>
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly ICacheService _cacheService;

    public RemoveSkillMentorCommandHandler(IUnitOfWork unitOfWork, ICacheService cacheService)
    {
        _unitOfWork = unitOfWork;
        _cacheService = cacheService;
    }

    public async Task<Unit> Handle(
        RemoveSkillMentorCommand request,
        CancellationToken cancellationToken
    )
    {
        // Verify mentor exists
        var mentor = await _unitOfWork.Mentor.GetByIdAsync(request.MentorId, cancellationToken);
        if (mentor == null)
            throw new NotFoundException("Mentor", request.MentorId.ToString());

        // Verify skill exists and belongs to this mentor
        var skill = await _unitOfWork.MentorSkill.GetByIdAsync(request.SkillId, cancellationToken);
        if (skill == null || skill.MentorId != request.MentorId)
            throw new NotFoundException("MentorSkill", request.SkillId.ToString());

        _unitOfWork.MentorSkill.Remove(skill);
        await _unitOfWork.SaveChangesAsync(cancellationToken);

        // Invalidate mentor detail cache
        await _cacheService.RemoveAsync(
            CacheKeys.MentorDetail(request.MentorId),
            cancellationToken
        );

        return Unit.Value;
    }
}
