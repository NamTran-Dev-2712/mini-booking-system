public interface IIdentityService
{
    Task<Guid> RegisterAsync(
        string fullName,
        string email,
        string password,
        string phoneNumber,
        string? avatarUrl = null,
        CancellationToken cancellationToken = default
    );

    Task<AuthResult> LoginAsync(
        string email,
        string password,
        CancellationToken cancellationToken = default
    );

    Task<AuthResult> GoogleLoginAsync(
        string email,
        string? name,
        string? avatarUrl,
        string googleUserId,
        CancellationToken cancellationToken = default
    );

    Task CompleteProfileAsync(
        Guid userId,
        string phoneNumber,
        CancellationToken cancellationToken = default
    );

    Task<bool> CheckPasswordAsync(
        string email,
        string password,
        CancellationToken cancellationToken = default
    );

    Task<UserDTO> GetProfileAsync(Guid userId, CancellationToken cancellationToken = default);
    Task<AuthResult> RefreshTokenAsync(
        string refreshToken,
        CancellationToken cancellationToken = default
    );

    Task ResetPasswordAsync(
        Guid userId,
        string newPassword,
        CancellationToken cancellationToken = default
    );

    Task ChangePasswordAsync(
        Guid userId,
        string currentPassword,
        string newPassword,
        CancellationToken cancellationToken = default
    );
}
