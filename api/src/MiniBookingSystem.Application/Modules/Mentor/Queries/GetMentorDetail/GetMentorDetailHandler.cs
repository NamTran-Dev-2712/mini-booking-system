using FluentValidation;
using MediatR;

public class GetMentorDetailHandler : IRequestHandler<GetMentorDetailQuery, MentorDetailDTO>
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly ICacheService _cacheService;

    public GetMentorDetailHandler(IUnitOfWork unitOfWork, ICacheService cacheService)
    {
        _unitOfWork = unitOfWork;
        _cacheService = cacheService;
    }

    public async Task<MentorDetailDTO> Handle(
        GetMentorDetailQuery request,
        CancellationToken cancellationToken
    )
    {
        var key = CacheKeys.MentorDetail(request.MentorId);
        var cached = await _cacheService.GetAsync<MentorDetailDTO>(key);
        if (cached != null)
            return cached;

        var mentor = await _unitOfWork.Mentor.GetByIdAsync(request.MentorId, cancellationToken);
        if (mentor == null)
            throw new NotFoundException($"Mentor", request.MentorId.ToString());

        var mentorSkills = await _unitOfWork.MentorSkill.GetAllAsync(ms =>
            ms.MentorId == request.MentorId
        );

        var mentorDetail = new MentorDetailDTO
        {
            Id = mentor.Id,
            UserId = mentor.UserId,
            Bio = mentor.Bio,
            Skills = mentorSkills
                .Select(ms => new MentorSkillDTO { Id = ms.Id, SkillName = ms.SkillName })
                .ToList(),
        };

        await _cacheService.SetAsync(key, mentorDetail, TimeSpan.FromMinutes(10));

        return mentorDetail;
    }
}
