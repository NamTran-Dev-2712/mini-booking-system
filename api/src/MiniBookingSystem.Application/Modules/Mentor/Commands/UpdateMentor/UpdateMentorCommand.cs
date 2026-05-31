using MediatR;

public record UpdateMentorCommand(
    Guid Id,
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
) : IRequest<Guid>;
