public record UserDTO(
    Guid Id,
    string FullName,
    string Email,
    string PhoneNumber,
    string? AvatarUrl,
    DateTime CreatedAt,
    IEnumerable<string> Roles
);
