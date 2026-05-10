public record UserDTO(
    Guid Id,
    string FullName,
    string Email,
    string PhoneNumber,
    DateTime CreatedAt,
    IEnumerable<string> Roles
);
