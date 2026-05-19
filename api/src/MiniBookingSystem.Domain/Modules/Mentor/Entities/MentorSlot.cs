public class MentorSlot : BaseEntity
{
    public Guid MentorId { get; set; }
    public string Name { get; set; } = string.Empty;
    public DateTime StartTime { get; set; }
    public DateTime EndTime { get; set; }
    public MentorSlotStatus Status { get; set; }
    public string? Description { get; set; }
    public int MaxBookings { get; set; }
    public int CurrentBookings { get; set; }
    public decimal Price { get; set; }

    public Mentor Mentor { get; set; } = default!;
    public ICollection<Booking> Bookings { get; set; } = new List<Booking>();
}
