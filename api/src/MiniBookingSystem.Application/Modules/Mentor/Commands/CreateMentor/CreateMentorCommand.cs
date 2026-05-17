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
    string? AvatarUrl
) : IRequest<Guid>;
