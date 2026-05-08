public interface IPaymentWebhookLogRepository : IGenericRepository<PaymentWebhookLog>
{
    Task<bool> ExistsProcessedAsync(
        string provider,
        string externalReference,
        CancellationToken cancellationToken = default
    );
}
