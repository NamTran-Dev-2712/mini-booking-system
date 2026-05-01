using FluentValidation;
using MediatR;

public class GetMentorDetailHandler : IRequestHandler<GetMentorDetailQuery, MentorDetailDTO>
{
    private readonly IUnitOfWork _unitOfWork;

    public GetMentorDetailHandler(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public async Task<MentorDetailDTO> Handle(
        GetMentorDetailQuery request,
        CancellationToken cancellationToken
    )
    {
        var mentor = await _unitOfWork.Mentor.GetByIdAsync(request.MentorId, cancellationToken);
        if (mentor == null)
            throw new NotFoundException($"Mentor", request.MentorId.ToString());

        var mentorSkills = await _unitOfWork.MentorSkill.GetAllAsync(ms =>
            ms.MentorId == request.MentorId
        );

        return new MentorDetailDTO
        {
            Id = mentor.Id,
            UserId = mentor.UserId,
            Bio = mentor.Bio,
            Skills = mentorSkills
                .Select(ms => new MentorSkillDTO { Id = ms.Id, SkillName = ms.SkillName })
                .ToList(),
        };
    }
}
