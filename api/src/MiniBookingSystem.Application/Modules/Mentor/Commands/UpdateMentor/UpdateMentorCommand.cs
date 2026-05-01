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
    string? AvatarUrl
) : IRequest<Guid>;
