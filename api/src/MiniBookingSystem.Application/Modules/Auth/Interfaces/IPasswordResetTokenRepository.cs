public interface IPasswordResetTokenRepository : IGenericRepository<PasswordResetToken>
{
    Task<PasswordResetToken?> GetByTokenHashAsync(
        string tokenHash,
        CancellationToken cancellationToken = default
    );
    Task InvalidateAllForUserAsync(Guid userId, CancellationToken cancellationToken = default);
}
