using Microsoft.EntityFrameworkCore;

public class PaymentRepository
    : GenericRepository<PaymentTransaction>,
        IPaymentTransactionRepository
{
    private new readonly ApplicationDbContext _context;

    public PaymentRepository(ApplicationDbContext context)
        : base(context)
    {
        _context = context;
    }

    public async Task<PaymentTransaction?> GetByBookingIdAsync(
        Guid bookingId,
        CancellationToken cancellationToken = default
    )
    {
        return await _context.PaymentTransactions.FirstOrDefaultAsync(
            pt => pt.BookingId == bookingId,
            cancellationToken
        );
    }

    public async Task<PaymentTransaction?> GetPendingByProviderOrderCodeWithBookingAsync(
        PaymentProvider provider,
        string orderCode,
        CancellationToken cancellationToken = default
    )
    {
        return await _context
            .PaymentTransactions.Include(pt => pt.Booking)
            .FirstOrDefaultAsync(
                pt =>
                    pt.Provider == provider
                    && pt.ProviderOrderCode == orderCode
                    && pt.Status == PaymentStatus.Pending,
                cancellationToken
            );
    }
}
