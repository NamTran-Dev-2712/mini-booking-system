public interface IIdentityService
{
    Task<Guid> RegisterAsync(
        string fullName,
        string email,
        string password,
        string phoneNumber,
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

    Task<UserDTO> GetProfileAsync(string userId, CancellationToken cancellationToken = default);
    Task<AuthResult> RefreshTokenAsync(
        string refreshToken,
        CancellationToken cancellationToken = default
    );
}
