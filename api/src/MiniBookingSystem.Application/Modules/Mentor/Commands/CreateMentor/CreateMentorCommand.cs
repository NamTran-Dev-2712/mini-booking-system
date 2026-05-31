using MediatR;

public record CreateMentorCommand(
    string FullName,
    string Email,
    string PhoneNumber,
    string? DisplayName,
    string? Bio,
    string? Specialization,
    int ExperienceYears,
    decimal BasePrice,
    string? AvatarUrl,
    string? FacebookUrl = null,
    string? GithubUrl = null,
    string? LinkedInUrl = null,
    string? TelegramUrl = null,
    string? WebsiteUrl = null
) : IRequest<Guid>;
