using FluentValidation;
using MiniBookingSystem.Application.Common.Constants;

public class CreateMentorCommandValidator : AbstractValidator<CreateMentorCommand>
{
    public CreateMentorCommandValidator()
    {
        // Information about the mentor
        RuleFor(x => x.FullName)
            .NotEmpty()
            .WithMessage("Full name is required.")
            .MaximumLength(100)
            .WithMessage("Full name must not exceed 100 characters.")
            .Matches(ValidationPatterns.VietnameseFullName)
            .WithMessage("Full name must contain only Vietnamese letters and spaces.");

        RuleFor(x => x.Email)
            .NotEmpty()
            .WithMessage("Email is required.")
            .EmailAddress()
            .WithMessage("Invalid email format.");

        RuleFor(x => x.PhoneNumber)
            .NotEmpty()
            .WithMessage("Phone number is required.")
            .Matches(ValidationPatterns.VietnamesePhoneNumber)
            .WithMessage("Phone number must be a valid Vietnamese phone number.");

        // Additional information about the mentor
        RuleFor(x => x.DisplayName)
            .MaximumLength(50)
            .WithMessage("Display name must not exceed 50 characters.");

        RuleFor(x => x.Bio).MaximumLength(1000).WithMessage("Bio must not exceed 1000 characters.");

        RuleFor(x => x.Specialization)
            .NotEmpty()
            .When(x => x.ExperienceYears > 0)
            .WithMessage("Specialization is required if experience years is greater than 0.");

        RuleFor(x => x.ExperienceYears)
            .InclusiveBetween(0, 50)
            .WithMessage("Experience years is invalid (0 - 50 years).");

        RuleFor(x => x.BasePrice)
            .GreaterThanOrEqualTo(0)
            .WithMessage("Base price must not be a negative number.");

        RuleFor(x => x.AvatarUrl)
            .Must(ValidationPatterns.LinkMustBeValid)
            .WithMessage("Invalid avatar URL.")
            .When(x => !string.IsNullOrEmpty(x.AvatarUrl));
    }
}
