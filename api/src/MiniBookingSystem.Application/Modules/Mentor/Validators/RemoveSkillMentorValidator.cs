using FluentValidation;

public class RemoveSkillMentorCommandValidator : AbstractValidator<RemoveSkillMentorCommand>
{
    public RemoveSkillMentorCommandValidator()
    {
        RuleFor(x => x.MentorId).NotEmpty().WithMessage("MentorId is required.");
        RuleFor(x => x.SkillId).NotEmpty().WithMessage("SkillId is required.");
    }
}
