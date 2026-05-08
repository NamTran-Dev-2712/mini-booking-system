public class CreatePaymentDTO
{
    public Guid PaymentTransactionId { get; }
    public string ProviderOrderCode { get; }
    public decimal Amount { get; }
    public string Currency { get; }
    public string QrCodeUrl { get; }
    public DateTime ExpiredAt { get; }

    public CreatePaymentDTO(
        Guid paymentTransactionId,
        string providerOrderCode,
        decimal amount,
        string currency,
        string qrCodeUrl,
        DateTime expiredAt
    )
    {
        PaymentTransactionId = paymentTransactionId;
        ProviderOrderCode = providerOrderCode;
        Amount = amount;
        Currency = currency;
        QrCodeUrl = qrCodeUrl;
        ExpiredAt = expiredAt;
    }
}
