public class MentorSkill : BaseEntity
{
    public Guid MentorId { get; set; }
    public string SkillName { get; set; } = default!;

    public Mentor Mentor { get; set; } = default!;
}
