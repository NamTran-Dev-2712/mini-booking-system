public class BookingDto
{
    public Guid Id { get; init; }
    public Guid UserId { get; init; }
    public required string BookingCode { get; init; }
    public required MentorSlotDTO MentorSlot { get; init; }
    public required MentorDto Mentor { get; init; }
    public BookingStatus Status { get; init; }
    public string? CancellationReason { get; init; }
    public DateTime CreatedAt { get; init; }
    public DateTime? UpdatedAt { get; init; }
}
