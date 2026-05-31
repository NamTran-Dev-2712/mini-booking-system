public record UpdateProfileRequest(
    string? FullName,
    string? PhoneNumber,
    string? DisplayName,
    string? Bio,
    string? Specialization,
    int? ExperienceYears,
    decimal? BasePrice,
    string? AvatarUrl,
    string? FacebookUrl = null,
    string? GithubUrl = null,
    string? LinkedInUrl = null,
    string? TelegramUrl = null,
    string? WebsiteUrl = null
);
