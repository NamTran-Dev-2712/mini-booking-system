using FluentValidation;
using MiniBookingSystem.Application.Common.Constants;

public class RegisterMentorValidator : AbstractValidator<RegisterMentorCommand>
{
    public RegisterMentorValidator()
    {
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

        RuleFor(x => x.Password)
            .NotEmpty()
            .WithMessage("Password is required.")
            .MinimumLength(8)
            .WithMessage("Password must be at least 8 characters long.")
            .Matches(ValidationPatterns.StrongPassword)
            .WithMessage(
                "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character."
            );

        RuleFor(x => x.PhoneNumber)
            .NotEmpty()
            .WithMessage("Phone number is required.")
            .Matches(ValidationPatterns.VietnamesePhoneNumber)
            .WithMessage("Phone number must be a valid Vietnamese phone number.");

        RuleFor(x => x.AvatarUrl)
            .Must(ValidationPatterns.LinkMustBeValid)
            .WithMessage("Invalid avatar URL.")
            .When(x => !string.IsNullOrEmpty(x.AvatarUrl));
    }
}
