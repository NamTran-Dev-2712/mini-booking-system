using FluentValidation;

public class CreatePaymentCommandValidator : AbstractValidator<CreatePaymentCommand>
{
    public CreatePaymentCommandValidator()
    {
        RuleFor(x => x.UserId).NotEmpty().WithMessage("UserId is required");

        RuleFor(x => x.BookingId).NotEmpty().WithMessage("BookingId is required");

        RuleFor(x => x.Provider).IsInEnum().WithMessage("Invalid payment provider");

        RuleFor(x => x.Currency)
            .NotEmpty()
            .WithMessage("Currency is required")
            .Length(3)
            .WithMessage("Currency must be a 3-letter ISO code")
            .Matches("^[A-Z]{3}$")
            .WithMessage("Currency must be uppercase ISO format (e.g., USD, VND)");
    }
}
