using Microsoft.EntityFrameworkCore;

public class PaymentWebhookLogRepository
    : GenericRepository<PaymentWebhookLog>,
        IPaymentWebhookLogRepository
{
    private readonly ApplicationDbContext _dbContext;

    public PaymentWebhookLogRepository(ApplicationDbContext dbContext)
        : base(dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<bool> ExistsProcessedAsync(
        string provider,
        string externalReference,
        CancellationToken cancellationToken = default
    )
    {
        return await _dbContext.PaymentWebhookLogs.AnyAsync(
            log =>
                log.Provider == provider
                && log.ExternalReference == externalReference
                && log.Status == PaymentWebhookLogStatus.Processed,
            cancellationToken
        );
    }
}
