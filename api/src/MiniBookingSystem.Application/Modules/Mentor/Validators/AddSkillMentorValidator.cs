using FluentValidation;

public class AddSkillMentorCommandValidator : AbstractValidator<AddSkillMentorCommand>
{
    public AddSkillMentorCommandValidator()
    {
        // Validate cho MentorId
        RuleFor(x => x.MentorId).NotEmpty().WithMessage("MentorId is required.");

        // Validate cho SkillName
        RuleFor(x => x.SkillName)
            .NotEmpty()
            .WithMessage("SkillName is required.")
            .MaximumLength(100)
            .WithMessage("SkillName must not exceed 100 characters.")
            .Matches(@"^[\w\s\-\+\#\.]+$")
            .WithMessage("SkillName contains invalid characters.");
    }
}
