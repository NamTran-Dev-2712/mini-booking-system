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
}
