public class Mentor : BaseEntity
{
    public Guid UserId { get; set; }
    public string DisplayName { get; set; } = default!;
    public string Email { get; set; } = default!;
    public string? Bio { get; set; }
    public string? Specialization { get; set; }
    public int ExperienceYears { get; set; }
    public decimal BasePrice { get; set; }
    public string? AvatarUrl { get; set; }
    public bool IsActive { get; set; } = true;

    public ICollection<MentorSkill> Skills { get; set; } = new List<MentorSkill>();
    public ICollection<MentorSlot> Slots { get; set; } = new List<MentorSlot>();
}
