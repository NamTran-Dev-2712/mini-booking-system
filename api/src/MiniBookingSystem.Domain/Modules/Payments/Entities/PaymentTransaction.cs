public class PaymentTransaction : BaseEntity
{
    public Guid BookingId { get; set; }
    public string Provider { get; set; } = default!;
    public string? ProviderTransactionId { get; set; }
    public string ProviderOrderCode { get; set; } = default!;
    public decimal Amount { get; set; }
    public string Currency { get; set; } = "VND";
    public PaymentStatus Status { get; set; }
    public string? PaymentUrl { get; set; }
    public string? QrCodeUrl { get; set; }
    public DateTime? PaidAt { get; set; }
    public DateTime? ExpiredAt { get; set; }
    public string? RawCallbackData { get; set; }
    public string? FailureReason { get; set; }

    public Booking Booking { get; set; } = default!;
}
