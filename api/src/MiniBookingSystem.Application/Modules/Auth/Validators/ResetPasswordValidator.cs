using FluentValidation;
using MiniBookingSystem.Application.Common.Constants;

public class ResetPasswordValidator : AbstractValidator<ResetPasswordCommand>
{
    public ResetPasswordValidator()
    {
        RuleFor(x => x.Email)
            .NotEmpty()
            .WithMessage("Email is required.")
            .EmailAddress()
            .WithMessage("Invalid email format.");

        RuleFor(x => x.Token).NotEmpty().WithMessage("Reset token is required.");

        RuleFor(x => x.OtpCode)
            .NotEmpty()
            .WithMessage("OTP code is required.")
            .Length(6)
            .WithMessage("OTP code must be 6 digits.")
            .Matches(@"^\d{6}$")
            .WithMessage("OTP code must contain only digits.");

        RuleFor(x => x.NewPassword)
            .NotEmpty()
            .WithMessage("New password is required.")
            .MinimumLength(8)
            .WithMessage("Password must be at least 8 characters long.")
            .Matches(ValidationPatterns.StrongPassword)
            .WithMessage(
                "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character."
            );
    }
}
