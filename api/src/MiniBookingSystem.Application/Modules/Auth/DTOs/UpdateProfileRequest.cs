public record UpdateProfileRequest(
    string? FullName,
    string? PhoneNumber,
    string? DisplayName,
    string? Bio,
    string? Specialization,
    int? ExperienceYears,
    decimal? BasePrice,
    string? AvatarUrl
);
