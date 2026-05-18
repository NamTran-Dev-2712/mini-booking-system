using Microsoft.EntityFrameworkCore;

public class PasswordResetTokenRepository
    : GenericRepository<PasswordResetToken>,
        IPasswordResetTokenRepository
{
    private readonly ApplicationDbContext _dbContext;

    public PasswordResetTokenRepository(ApplicationDbContext dbContext)
        : base(dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<PasswordResetToken?> GetByTokenHashAsync(
        string tokenHash,
        CancellationToken cancellationToken = default
    )
    {
        return await _dbContext.PasswordResetTokens.FirstOrDefaultAsync(
            t => t.TokenHash == tokenHash,
            cancellationToken
        );
    }

    public async Task InvalidateAllForUserAsync(
        Guid userId,
        CancellationToken cancellationToken = default
    )
    {
        var activeTokens = await _dbContext
            .PasswordResetTokens.Where(t =>
                t.UserId == userId && t.ConsumedAt == null && t.ExpiresAt > DateTime.UtcNow
            )
            .ToListAsync(cancellationToken);

        foreach (var token in activeTokens)
            token.ConsumedAt = DateTime.UtcNow;

        await _dbContext.SaveChangesAsync(cancellationToken);
    }
}
