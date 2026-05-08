public class PaymentStatusDTO
{
    public Guid PaymentTransactionId { get; init; }
    public PaymentStatus Status { get; init; }
    public string StatusName => Status.ToString();
    public DateTime? PaidAt { get; init; }
    public DateTime? ExpiredAt { get; init; }
    public string? FailureReason { get; init; }
}
