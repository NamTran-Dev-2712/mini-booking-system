using FluentValidation;
using MiniBookingSystem.Application.Common.Constants;

public class UpdateMentorCommandValidator : AbstractValidator<UpdateMentorCommand>
{
    public UpdateMentorCommandValidator()
    {
        RuleFor(x => x.Id).NotEmpty().WithMessage("Id is required.");

        RuleFor(x => x.FullName)
            .MaximumLength(100)
            .WithMessage("Full name must not exceed 100 characters.")
            .Matches(ValidationPatterns.VietnameseFullName)
            .WithMessage("Full name must contain only Vietnamese letters and spaces.")
            .When(x => x.FullName != null);

        RuleFor(x => x.PhoneNumber)
            .Matches(ValidationPatterns.VietnamesePhoneNumber)
            .WithMessage("Phone number must be a valid Vietnamese phone number.")
            .When(x => !string.IsNullOrEmpty(x.PhoneNumber));

        RuleFor(x => x.Bio)
            .MaximumLength(1000)
            .WithMessage("Bio must not exceed 1000 characters.")
            .When(x => x.Bio != null);

        RuleFor(x => x.ExperienceYears)
            .InclusiveBetween(0, 50)
            .WithMessage("Experience years must be between 0 and 50.")
            .When(x => x.ExperienceYears.HasValue);

        RuleFor(x => x.BasePrice)
            .GreaterThanOrEqualTo(0)
            .WithMessage("Base price must not be a negative number.")
            .When(x => x.BasePrice.HasValue);

        RuleFor(x => x.AvatarUrl)
            .Must(ValidationPatterns.LinkMustBeValid)
            .WithMessage("Invalid avatar URL.")
            .When(x => !string.IsNullOrEmpty(x.AvatarUrl));

        RuleFor(x => x.Specialization)
            .NotEmpty()
            .WithMessage("Specialization must not be empty if updating.")
            .When(x => x.Specialization != null);
    }
}
