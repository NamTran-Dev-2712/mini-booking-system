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

    public void Initialize(
        Guid userId,
        string displayName,
        string email,
        string? bio,
        string? specialization,
        int experienceYears,
        decimal basePrice,
        string? avatarUrl
    )
    {
        UserId = userId;
        DisplayName = displayName;
        Email = email;
        Bio = bio;
        Specialization = specialization;
        ExperienceYears = experienceYears;
        BasePrice = basePrice;
        AvatarUrl = avatarUrl;
    }

    public void Update(
        string? displayName,
        string? bio,
        string? specialization,
        int? experienceYears,
        decimal? basePrice,
        string? avatarUrl
    )
    {
        if (displayName is not null)
            DisplayName = displayName;
        if (bio is not null)
            Bio = bio;
        if (specialization is not null)
            Specialization = specialization;
        if (experienceYears.HasValue)
            ExperienceYears = experienceYears.Value;
        if (basePrice.HasValue)
            BasePrice = basePrice.Value;
        if (avatarUrl is not null)
            AvatarUrl = avatarUrl;
    }
}
