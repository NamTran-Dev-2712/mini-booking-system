using FluentValidation;
using MediatR;

public class AddSkillMentorCommandHandler : IRequestHandler<AddSkillMentorCommand, Guid>
{
    private readonly IUnitOfWork _unitOfWork;

    public AddSkillMentorCommandHandler(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public async Task<Guid> Handle(
        AddSkillMentorCommand request,
        CancellationToken cancellationToken
    )
    {
        var mentor = await _unitOfWork.Mentor.GetByIdAsync(request.MentorId, cancellationToken);
        if (mentor == null)
            throw new NotFoundException($"Mentor", request.MentorId.ToString());

        // Check if the skill already exists for the mentor
        if (
            await _unitOfWork.MentorSkill.MentorHasSkillAsync(
                request.MentorId,
                request.SkillName,
                cancellationToken
            )
        )
            throw new ConflictException($"Mentor already has the skill '{request.SkillName}'.");

        var mentorSkill = new MentorSkill
        {
            MentorId = request.MentorId,
            SkillName = request.SkillName,
        };

        await _unitOfWork.MentorSkill.AddAsync(mentorSkill, cancellationToken);

        await _unitOfWork.SaveChangesAsync(cancellationToken);
        return request.MentorId;
    }
}
