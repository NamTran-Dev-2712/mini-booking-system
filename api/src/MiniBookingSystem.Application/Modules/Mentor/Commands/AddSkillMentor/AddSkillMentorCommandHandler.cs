using FluentValidation;
using MediatR;

public class AddSkillMentorCommandHandler : IRequestHandler<AddSkillMentorCommand, Guid>
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly ICacheService _cacheService;
    private readonly ILocalizationService _localizer;

    public AddSkillMentorCommandHandler(
        IUnitOfWork unitOfWork,
        ICacheService cacheService,
        ILocalizationService localizer
    )
    {
        _unitOfWork = unitOfWork;
        _cacheService = cacheService;
        _localizer = localizer;
    }

    public async Task<Guid> Handle(
        AddSkillMentorCommand request,
        CancellationToken cancellationToken
    )
    {
        var mentor = await _unitOfWork.Mentor.GetByIdAsync(request.MentorId, cancellationToken);
        if (mentor == null)
            throw new NotFoundException(_localizer.GetMessage("Mentor.NotFound"));

        // Check if the skill already exists for the mentor
        if (
            await _unitOfWork.MentorSkill.MentorHasSkillAsync(
                request.MentorId,
                request.SkillName,
                cancellationToken
            )
        )
            throw new ConflictException(_localizer.GetMessage("Mentor.SkillAlreadyExists"));

        var mentorSkill = new MentorSkill
        {
            MentorId = request.MentorId,
            SkillName = request.SkillName,
        };

        await _unitOfWork.MentorSkill.AddAsync(mentorSkill, cancellationToken);

        await _unitOfWork.SaveChangesAsync(cancellationToken);
        await _cacheService.RemoveAsync(
            CacheKeys.MentorDetail(request.MentorId),
            cancellationToken
        );
        return request.MentorId;
    }
}
