public class MentorDto
{
    public Guid Id { get; init; }
    public Guid UserId { get; init; }
    public string DisplayName { get; init; } = default!;
    public string Email { get; init; } = default!;
    public string? Bio { get; init; }
    public string? Specialization { get; init; }
    public int ExperienceYears { get; init; }
    public decimal BasePrice { get; init; }
    public string? AvatarUrl { get; init; }
    public bool IsActive { get; init; }
    public DateTime CreatedAt { get; init; }
}
