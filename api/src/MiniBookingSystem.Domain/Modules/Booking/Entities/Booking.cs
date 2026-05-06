public class Booking : BaseEntity
{
    public Guid UserId { get; set; }
    public Guid MentorSlotId { get; set; }
    public BookingStatus Status { get; set; }
    public string BookingCode { get; set; } = default!;
    public DateTime BookedAt { get; set; }
    public DateTime? ConfirmedAt { get; set; }
    public DateTime? CancelledAt { get; set; }
    public DateTime ExpiresAt { get; set; }
    public string? CancellationReason { get; set; }
    public string? Notes { get; set; }

    public MentorSlot MentorSlot { get; set; } = default!;
    public ICollection<PaymentTransaction> PaymentTransactions { get; set; } =
        new List<PaymentTransaction>();

    public void CreateBooking(Guid userId, MentorSlot mentorSlot)
    {
        UserId = userId;
        MentorSlotId = mentorSlot.Id;
        Status = BookingStatus.PendingPayment;
        BookingCode = GenerateBookingCode();
        BookedAt = DateTime.UtcNow;
        ExpiresAt = BookedAt.AddMinutes(15); // Booking expires in 15 minutes if not confirmed
    }

    private string GenerateBookingCode()
    {
        // Generate a unique booking code (e.g., using a GUID or a custom format)
        return Guid.NewGuid().ToString("N").ToUpper();
    }

    public void ConfirmBooking()
    {
        Status = BookingStatus.Confirmed;
        ConfirmedAt = DateTime.UtcNow;
    }

    public void CancelBooking(string? reason = null)
    {
        Status = BookingStatus.Cancelled;
        CancelledAt = DateTime.UtcNow;
        CancellationReason = reason;
    }
}
