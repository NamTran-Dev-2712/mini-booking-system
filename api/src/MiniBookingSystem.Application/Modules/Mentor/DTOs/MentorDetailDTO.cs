public class MentorDetailDTO : MentorDto
{
    public List<MentorSkillDTO> Skills { get; init; } = new();
    public List<MentorSlotDTO> Slots { get; init; } = new();
}

public class MentorSkillDTO
{
    public Guid Id { get; init; }
    public string SkillName { get; init; } = default!;
}

public class MentorSlotDTO
{
    public Guid Id { get; init; }
    public string Name { get; init; } = default!;
    public DateTime StartTime { get; init; }
    public DateTime EndTime { get; init; }
    public MentorSlotStatus Status { get; init; }
    public decimal Price { get; init; }
    public string? Location { get; init; }
    public int MaxBookings { get; init; }
    public int CurrentBookings { get; init; }
}
