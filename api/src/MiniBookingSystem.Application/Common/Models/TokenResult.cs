public sealed record TokenResult(
    string AccessToken,
    string RefreshToken,
    string RefreshTokenHash,
    DateTime RefreshTokenExpiry
);
