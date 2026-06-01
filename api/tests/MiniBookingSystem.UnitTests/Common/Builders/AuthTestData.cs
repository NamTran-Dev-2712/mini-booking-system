namespace MiniBookingSystem.UnitTests.Common.Builders;

/// <summary>
/// Centralised factory for test data objects.
/// Using a single source of truth prevents scattered hard-coded strings across test files.
/// </summary>
internal static class AuthTestData
{
    // ── Canonical valid values ─────────────────────────────────────────────
    public static class Valid
    {
        public const string FullName = "Nguyen Van An";
        public const string Email = "user@example.com";
        public const string Password = "P@ssw0rd!";
        public const string PhoneNumber = "0912345678";
        public static readonly Guid UserId = new("11111111-1111-1111-1111-111111111111");
    }

    // ── Builder methods ────────────────────────────────────────────────────

    public static ApplicationUser BuildUser(
        Guid? id = null,
        string? email = null,
        string? phoneNumber = null,
        string? fullName = null,
        bool isActive = true,
        bool isDeleted = false
    )
    {
        return new ApplicationUser
        {
            Id = id ?? Valid.UserId,
            Email = email ?? Valid.Email,
            UserName = email ?? Valid.Email,
            PhoneNumber = phoneNumber ?? Valid.PhoneNumber,
            FullName = fullName ?? Valid.FullName,
            CreatedAt = new DateTime(2025, 1, 1, 0, 0, 0, DateTimeKind.Utc),
            IsActive = isActive,
            IsDeleted = isDeleted,
        };
    }

    public static AuthResult BuildAuthResult(Guid? userId = null)
    {
        return new AuthResult(
            UserId: (userId ?? Valid.UserId).ToString(),
            FullName: Valid.FullName,
            Email: Valid.Email,
            PhoneNumber: Valid.PhoneNumber,
            AccessToken: "eyJhbGciOiJIUzI1NiJ9.access",
            RefreshToken: "eyJhbGciOiJIUzI1NiJ9.refresh",
            ExpiresIn: new DateTime(2025, 1, 1, 0, 15, 0, DateTimeKind.Utc),
            RefreshTokenExpiresAt: new DateTime(2025, 1, 8, 0, 0, 0, DateTimeKind.Utc),
            CreatedAt: new DateTime(2025, 1, 1, 0, 0, 0, DateTimeKind.Utc),
            Roles: ["User"]
        );
    }

    public static UserDTO BuildUserDto(Guid? id = null)
    {
        return new UserDTO(
            Id: id ?? Valid.UserId,
            FullName: Valid.FullName,
            Email: Valid.Email,
            PhoneNumber: Valid.PhoneNumber,
            AvatarUrl: null,
            CreatedAt: new DateTime(2025, 1, 1, 0, 0, 0, DateTimeKind.Utc),
            Roles: ["User"]
        );
    }

    public static RegisterMentorCommand BuildRegisterMentorCommand(
        string? fullName = null,
        string? email = null,
        string? password = null,
        string? phoneNumber = null,
        string? avatarUrl = null
    ) =>
        new(
            FullName: fullName ?? Valid.FullName,
            Email: email ?? Valid.Email,
            Password: password ?? Valid.Password,
            PhoneNumber: phoneNumber ?? Valid.PhoneNumber,
            AvatarUrl: avatarUrl
        );

    public static TokenResult BuildTokenResult()
    {
        return new TokenResult(
            AccessToken: "eyJhbGciOiJIUzI1NiJ9.access",
            RefreshToken: "eyJhbGciOiJIUzI1NiJ9.refresh",
            RefreshTokenHash: "hashed-refresh-token-sha256",
            RefreshTokenExpiry: new DateTime(2025, 1, 8, 0, 0, 0, DateTimeKind.Utc)
        );
    }
}
