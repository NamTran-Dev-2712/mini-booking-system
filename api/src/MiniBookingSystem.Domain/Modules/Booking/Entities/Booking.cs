public class Booking : BaseEntity
{
    public Guid UserId { get; set; }
    public Guid MentorSlotId { get; set; }
    public BookingStatus Status { get; set; }
    public string BookingCode { get; set; } = default!;
    public DateTime BookedAt { get; set; }
    public DateTime? ConfirmedAt { get; set; }
    public DateTime? CancelledAt { get; set; }
    public string? CancellationReason { get; set; }
    public string? Notes { get; set; }

    public MentorSlot MentorSlot { get; set; } = default!;
    public ICollection<PaymentTransaction> PaymentTransactions { get; set; } =
        new List<PaymentTransaction>();
}
