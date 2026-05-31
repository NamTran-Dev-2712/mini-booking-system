using System;
using FluentValidation;

public class CreateSlotMentorCommandValidator : AbstractValidator<CreateSlotMentorCommand>
{
    public CreateSlotMentorCommandValidator()
    {
        // 1. Validate MentorId
        RuleFor(x => x.MentorId).NotEmpty().WithMessage("MentorId is required.");

        // 2. Validate Name
        RuleFor(x => x.Name)
            .NotEmpty()
            .WithMessage("Name is required.")
            .MaximumLength(200)
            .WithMessage("Name cannot exceed 200 characters.");

        // 3. Validate StartTime
        RuleFor(x => x.StartTime)
            .NotEmpty()
            .WithMessage("StartTime is required.")
            .GreaterThan(DateTime.UtcNow)
            .WithMessage("StartTime must be in the future.");

        // 3. Validate EndTime (compared to StartTime)
        RuleFor(x => x.EndTime)
            .NotEmpty()
            .WithMessage("EndTime is required.")
            .GreaterThan(x => x.StartTime)
            .WithMessage("EndTime must be after StartTime.");

        // 4. Limit the duration of the slot to be between 30 minutes and 12 hours
        // This rule will only run if StartTime and EndTime are valid, to avoid unnecessary calculations and potential exceptions
        RuleFor(x => x)
            .Must(x => (x.EndTime - x.StartTime).TotalMinutes >= 30)
            .WithMessage("The duration of a slot must be at least 30 minutes.")
            .Must(x => (x.EndTime - x.StartTime).TotalHours <= 12)
            .WithMessage("A slot cannot exceed 12 hours in duration.")
            // Only run this condition if StartTime and EndTime are valid
            .When(x => x.StartTime != default && x.EndTime > x.StartTime);

        // 5. Validate MaxBookings
        RuleFor(x => x.MaxBookings)
            .GreaterThan(0)
            .WithMessage("MaxBookings must be greater than 0.");

        // 6. Validate Description
        RuleFor(x => x.Description)
            .MaximumLength(1000)
            .WithMessage("Description cannot exceed 1000 characters.");

        // 6b. Validate Location (optional)
        RuleFor(x => x.Location)
            .MaximumLength(500)
            .WithMessage("Location cannot exceed 500 characters.");

        // 7. Validate Price
        RuleFor(x => x.Price)
            .NotEmpty()
            .WithMessage("Price is required.")
            .GreaterThanOrEqualTo(0)
            .WithMessage("Price cannot be a negative value.");
        // if you want to set an upper limit for price, you can uncomment the following line
        // .LessThanOrEqualTo(10000000).WithMessage("Price cannot exceed 10,000,000.");
    }
}
