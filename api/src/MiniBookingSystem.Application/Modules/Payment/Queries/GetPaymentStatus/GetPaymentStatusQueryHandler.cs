using MediatR;

public class GetPaymentStatusQueryHandler : IRequestHandler<GetPaymentStatusQuery, PaymentStatusDTO>
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly ILocalizationService _localizer;

    public GetPaymentStatusQueryHandler(IUnitOfWork unitOfWork, ILocalizationService localizer)
    {
        _unitOfWork = unitOfWork;
        _localizer = localizer;
    }

    public async Task<PaymentStatusDTO> Handle(
        GetPaymentStatusQuery request,
        CancellationToken cancellationToken
    )
    {
        var booking = await _unitOfWork.Booking.GetByIdAsync(request.BookingId, cancellationToken);
        if (booking == null)
            throw new NotFoundException(_localizer.GetMessage("Booking.NotFound"));

        if (booking.UserId != request.UserId)
            throw new UnauthorizedException(_localizer.GetMessage("Payment.Unauthorized"));

        var payment = await _unitOfWork.PaymentTransaction.GetByBookingIdAsync(
            request.BookingId,
            cancellationToken
        );

        if (payment == null)
            throw new NotFoundException(_localizer.GetMessage("Payment.NotFound"));

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
