using FluentValidation;

public class UpdateMentorStatusCommandValidator : AbstractValidator<UpdateMentorStatusCommand>
{
    public UpdateMentorStatusCommandValidator()
    {
        RuleFor(x => x.Id).NotEmpty().WithMessage("Id is required.");
    }
}
