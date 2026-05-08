using MediatR;

public record CreatePaymentCommand(
    Guid UserId,
    Guid BookingId,
    PaymentProvider Provider,
    string Currency
) : IRequest<CreatePaymentDTO>;
