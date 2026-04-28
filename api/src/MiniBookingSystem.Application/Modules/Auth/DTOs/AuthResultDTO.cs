public record AuthResult(
    string UserId,
    string FullName,
    string Email,
    string PhoneNumber,
    string AccessToken,
    string RefreshToken,
    DateTime ExpiresIn,
    DateTime RefreshTokenExpiresAt,
    DateTime CreatedAt
);
