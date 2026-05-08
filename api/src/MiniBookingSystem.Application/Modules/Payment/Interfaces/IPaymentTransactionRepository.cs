public interface IPaymentTransactionRepository : IGenericRepository<PaymentTransaction>
{
    Task<PaymentTransaction?> GetByBookingIdAsync(
        Guid bookingId,
        CancellationToken cancellationToken = default
    );

    Task<PaymentTransaction?> GetPendingByProviderOrderCodeWithBookingAsync(
        PaymentProvider provider,
        string orderCode,
        CancellationToken cancellationToken = default
    );
}
