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

    // Social links (all optional)
    public string? FacebookUrl { get; set; }
    public string? GithubUrl { get; set; }
    public string? LinkedInUrl { get; set; }
    public string? TelegramUrl { get; set; }
    public string? WebsiteUrl { get; set; }

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
        string? avatarUrl,
        string? facebookUrl = null,
        string? githubUrl = null,
        string? linkedInUrl = null,
        string? telegramUrl = null,
        string? websiteUrl = null
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
        FacebookUrl = facebookUrl;
        GithubUrl = githubUrl;
        LinkedInUrl = linkedInUrl;
        TelegramUrl = telegramUrl;
        WebsiteUrl = websiteUrl;
    }

    public void Update(
        string? displayName,
        string? bio,
        string? specialization,
        int? experienceYears,
        decimal? basePrice,
        string? avatarUrl,
        string? facebookUrl = null,
        string? githubUrl = null,
        string? linkedInUrl = null,
        string? telegramUrl = null,
        string? websiteUrl = null
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
        if (facebookUrl is not null)
            FacebookUrl = facebookUrl;
        if (githubUrl is not null)
            GithubUrl = githubUrl;
        if (linkedInUrl is not null)
            LinkedInUrl = linkedInUrl;
        if (telegramUrl is not null)
            TelegramUrl = telegramUrl;
        if (websiteUrl is not null)
            WebsiteUrl = websiteUrl;
    }
}
