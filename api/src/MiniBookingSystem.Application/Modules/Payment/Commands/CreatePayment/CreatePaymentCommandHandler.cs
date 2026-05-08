using FluentValidation;
using MediatR;

public class CreatePaymentCommandHandler : IRequestHandler<CreatePaymentCommand, CreatePaymentDTO>
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly ISePayQrService _sePayQrService;

    public CreatePaymentCommandHandler(IUnitOfWork unitOfWork, ISePayQrService sePayQrService)
    {
        _unitOfWork = unitOfWork;
        _sePayQrService = sePayQrService;
    }

    public async Task<CreatePaymentDTO> Handle(
        CreatePaymentCommand request,
        CancellationToken cancellationToken
    )
    {
        if (request.Provider != PaymentProvider.SePay)
            throw new ValidationException("Unsupported payment provider.");

        var booking = await _unitOfWork.Booking.GetByIdAsync(request.BookingId, b => b.MentorSlot);
        if (booking == null)
            throw new NotFoundException($"Booking", request.BookingId.ToString());

        if (booking.UserId != request.UserId)
            throw new UnauthorizedException("You can only create payments for your own bookings.");

        if (booking.Status != BookingStatus.PendingPayment)
            throw new ValidationException(
                "Payment can only be created for bookings with pending payment status."
            );

        // Idempotency: return existing pending transaction if still valid
        var existingTransaction = await _unitOfWork.PaymentTransaction.GetByBookingIdAsync(
            request.BookingId,
            cancellationToken
        );

        if (
            existingTransaction != null
            && existingTransaction.Status == PaymentStatus.Pending
            && existingTransaction.ExpiredAt > DateTime.UtcNow
        )
        {
            return new CreatePaymentDTO(
                existingTransaction.Id,
                existingTransaction.ProviderOrderCode,
                existingTransaction.Amount,
                request.Currency,
                existingTransaction.QrCodeUrl!,
                existingTransaction.ExpiredAt!.Value
            );
        }

        var amount = booking.MentorSlot.Price;
        var orderCode = _sePayQrService.GenerateSePayOrderCode();
        var qrUrl = _sePayQrService.GenerateQrUrl(orderCode, amount);
        var expiredAt = DateTime.UtcNow.AddMinutes(30);

        var paymentTransaction = new PaymentTransaction
        {
            BookingId = request.BookingId,
            Provider = request.Provider,
            Currency = request.Currency,
            ProviderOrderCode = orderCode,
            Amount = amount,
            QrCodeUrl = qrUrl,
            ExpiredAt = expiredAt,
            Status = PaymentStatus.Pending,
        };

        await _unitOfWork.PaymentTransaction.AddAsync(paymentTransaction, cancellationToken);
        await _unitOfWork.SaveChangesAsync(cancellationToken);

        return new CreatePaymentDTO(
            paymentTransactionId: paymentTransaction.Id,
            providerOrderCode: paymentTransaction.ProviderOrderCode,
            amount: paymentTransaction.Amount,
            currency: paymentTransaction.Currency,
            qrCodeUrl: qrUrl,
            expiredAt: expiredAt
        );
    }
}
