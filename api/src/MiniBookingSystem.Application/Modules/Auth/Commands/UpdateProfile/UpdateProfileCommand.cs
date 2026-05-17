using MediatR;

public record UpdateProfileCommand(
    Guid UserId,
    IEnumerable<string> Roles,
    string? FullName,
    string? PhoneNumber,
    string? DisplayName,
    string? Bio,
    string? Specialization,
    int? ExperienceYears,
    decimal? BasePrice,
    string? AvatarUrl
) : IRequest<Unit>;
