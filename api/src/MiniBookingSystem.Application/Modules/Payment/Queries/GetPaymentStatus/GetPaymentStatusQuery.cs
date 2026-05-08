using MediatR;

public record GetPaymentStatusQuery(Guid BookingId, Guid UserId) : IRequest<PaymentStatusDTO>;
