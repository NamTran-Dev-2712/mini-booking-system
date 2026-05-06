using FluentValidation;

public class CancelBookingCommandValidator : AbstractValidator<CancelBookingCommand>
{
    public CancelBookingCommandValidator()
    {
        // 1. Validate UserId
        RuleFor(x => x.UserId).NotEmpty().WithMessage("UserId is required.");

        // 2. Validate BookingId
        RuleFor(x => x.BookingId).NotEmpty().WithMessage("BookingId is required.");

        // 3. Validate CancellationReason
        // Trong môi trường Production, nên yêu cầu lý do hủy để phục vụ Audit/Log
        RuleFor(x => x.CancellationReason)
            .NotEmpty()
            .WithMessage("CancellationReason is required.")
            .MinimumLength(10)
            .WithMessage("CancellationReason must be at least 10 characters.")
            .MaximumLength(500)
            .WithMessage("CancellationReason cannot exceed 500 characters.");
    }
}
