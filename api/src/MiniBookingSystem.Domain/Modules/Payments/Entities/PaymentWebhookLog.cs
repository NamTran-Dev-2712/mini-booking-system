public class PaymentWebhookLog : BaseEntity
{
    public string Provider { get; set; } = default!;
    public string EventType { get; set; } = default!;
    public string? ExternalReference { get; set; }
    public string Payload { get; set; } = default!;
    public DateTime ReceivedAt { get; set; }
    public DateTime? ProcessedAt { get; set; }
    public PaymentWebhookLogStatus Status { get; set; }
    public string? ErrorMessage { get; set; }
}
