using FluentValidation;
using MiniBookingSystem.Application.Common.Constants;

public class UpdateProfileValidator : AbstractValidator<UpdateProfileCommand>
{
    public UpdateProfileValidator()
    {
        RuleFor(x => x.FullName)
            .MaximumLength(100)
            .WithMessage("Full name must not exceed 100 characters.")
            .Matches(ValidationPatterns.VietnameseFullName)
            .WithMessage("Full name must contain only Vietnamese letters and spaces.")
            .When(x => x.FullName is not null);

        RuleFor(x => x.PhoneNumber)
            .Matches(ValidationPatterns.VietnamesePhoneNumber)
            .WithMessage("Phone number must be a valid Vietnamese phone number.")
            .When(x => x.PhoneNumber is not null);

        RuleFor(x => x.DisplayName)
            .MaximumLength(50)
            .WithMessage("Display name must not exceed 50 characters.")
            .When(x => x.DisplayName is not null);

        RuleFor(x => x.Bio)
            .MaximumLength(1000)
            .WithMessage("Bio must not exceed 1000 characters.")
            .When(x => x.Bio is not null);

        RuleFor(x => x.Specialization)
            .MaximumLength(200)
            .WithMessage("Specialization must not exceed 200 characters.")
            .When(x => x.Specialization is not null);

        RuleFor(x => x.ExperienceYears)
            .InclusiveBetween(0, 50)
            .WithMessage("Experience years must be between 0 and 50.")
            .When(x => x.ExperienceYears is not null);

        RuleFor(x => x.BasePrice)
            .GreaterThanOrEqualTo(0)
            .WithMessage("Base price must be greater than or equal to 0.")
            .When(x => x.BasePrice is not null);

        RuleFor(x => x.AvatarUrl)
            .MaximumLength(500)
            .WithMessage("Avatar URL must not exceed 500 characters.")
            .Must(ValidationPatterns.LinkMustBeValid)
            .WithMessage("Avatar URL must be a valid HTTP or HTTPS link.")
            .When(x => x.AvatarUrl is not null);
    }
}
