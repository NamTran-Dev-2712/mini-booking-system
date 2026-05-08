using MediatR;

public class GetPaymentStatusQueryHandler : IRequestHandler<GetPaymentStatusQuery, PaymentStatusDTO>
{
    private readonly IUnitOfWork _unitOfWork;

    public GetPaymentStatusQueryHandler(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public async Task<PaymentStatusDTO> Handle(
        GetPaymentStatusQuery request,
        CancellationToken cancellationToken
    )
    {
        var booking = await _unitOfWork.Booking.GetByIdAsync(request.BookingId, cancellationToken);
        if (booking == null)
            throw new NotFoundException("Booking", request.BookingId.ToString());

        if (booking.UserId != request.UserId)
            throw new UnauthorizedException("You can only view payments for your own bookings.");

        var payment = await _unitOfWork.PaymentTransaction.GetByBookingIdAsync(
            request.BookingId,
            cancellationToken
        );

        if (payment == null)
            throw new NotFoundException("PaymentTransaction", request.BookingId.ToString());

        return new PaymentStatusDTO
        {
            PaymentTransactionId = payment.Id,
            Status = payment.Status,
            PaidAt = payment.PaidAt,
            ExpiredAt = payment.ExpiredAt,
            FailureReason = payment.FailureReason,
        };
    }
}
