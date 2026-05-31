using System;
using FluentValidation;

public class UpdateSlotMentorCommandValidator : AbstractValidator<UpdateSlotMentorCommand>
{
    public UpdateSlotMentorCommandValidator()
    {
        // 1. Validate Id
        RuleFor(x => x.Id).NotEmpty().WithMessage("Slot Id is required for updating.");

        // 2. Validate MentorId
        RuleFor(x => x.MentorId).NotEmpty().WithMessage("MentorId is required.");

        // 3. Validate Name
        RuleFor(x => x.Name)
            .NotEmpty()
            .WithMessage("Name is required.")
            .MaximumLength(200)
            .WithMessage("Name cannot exceed 200 characters.");

        // 4. Validate StartTime
        RuleFor(x => x.StartTime)
            .NotEmpty()
            .WithMessage("StartTime is required.")
            .GreaterThan(DateTime.UtcNow)
            .WithMessage("StartTime must be in the future.");

        // 4. Validate EndTime
        RuleFor(x => x.EndTime)
            .NotEmpty()
            .WithMessage("EndTime is required.")
            .GreaterThan(x => x.StartTime)
            .WithMessage("EndTime must be after StartTime.");

        // 5. Limit duration (30 mins - 12 hours)
        RuleFor(x => x)
            .Must(x => (x.EndTime - x.StartTime).TotalMinutes >= 30)
            .WithMessage("The duration of a slot must be at least 30 minutes.")
            .Must(x => (x.EndTime - x.StartTime).TotalHours <= 12)
            .WithMessage("A slot cannot exceed 12 hours in duration.")
            .When(x => x.StartTime != default && x.EndTime > x.StartTime);

        // 6. Validate MaxBookings (Trường mới thêm sau migration)
        RuleFor(x => x.MaxBookings)
            .GreaterThan(0)
            .WithMessage("MaxBookings must be greater than 0.");

        // 7. Validate Description
        RuleFor(x => x.Description)
            .MaximumLength(1000)
            .WithMessage("Description cannot exceed 1000 characters.");

        // 7b. Validate Location (optional)
        RuleFor(x => x.Location)
            .MaximumLength(500)
            .WithMessage("Location cannot exceed 500 characters.");

        // 8. Validate Price
        RuleFor(x => x.Price)
            .GreaterThanOrEqualTo(0)
            .WithMessage("Price cannot be a negative value.");
    }
}
