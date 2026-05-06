using FluentValidation;

public class CreateBookingCommandValidator : AbstractValidator<CreateBookingCommand>
{
    public CreateBookingCommandValidator()
    {
        RuleFor(x => x.UserId).NotEmpty().WithMessage("UserId is required.");

        RuleFor(x => x.MentorSlotId).NotEmpty().WithMessage("MentorSlotId is required.");

        RuleFor(x => x.Notes).MaximumLength(500).WithMessage("Notes cannot exceed 500 characters.");
    }
}
