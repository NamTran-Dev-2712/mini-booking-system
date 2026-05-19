using Microsoft.EntityFrameworkCore;

public class RefreshTokenRepository : GenericRepository<RefreshToken>, IRefreshTokenRepository
{
    private readonly ApplicationDbContext _dbContext;

    public RefreshTokenRepository(ApplicationDbContext dbContext)
        : base(dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task UpdateRefreshTokenAsync(
        string userId,
        string refreshToken,
        DateTime expiryTime
    )
    {
        if (!Guid.TryParse(userId, out var userGuid))
            throw new BadRequestException("Invalid user ID format.");

        // Revoke any existing active tokens for this user
        var existingTokens = await _dbContext
            .RefreshTokens.Where(t =>
                t.UserId == userGuid && t.RevokedAt == null && t.ExpiresAt > DateTime.UtcNow
            )
            .ToListAsync();

        foreach (var token in existingTokens)
            token.RevokedAt = DateTime.UtcNow;

        // Store new token
        await _dbContext.RefreshTokens.AddAsync(
            new RefreshToken
            {
                UserId = userGuid,
                Token = refreshToken,
                ExpiresAt = expiryTime,
            }
        );

        await _dbContext.SaveChangesAsync();
    }

    public async Task RemoveRefreshTokenAsync(string userId)
    {
        if (!Guid.TryParse(userId, out var userGuid))
            throw new BadRequestException("Invalid user ID format.");

        var activeTokens = await _dbContext
            .RefreshTokens.Where(t => t.UserId == userGuid && t.RevokedAt == null)
            .ToListAsync();

        foreach (var token in activeTokens)
            token.RevokedAt = DateTime.UtcNow;

        await _dbContext.SaveChangesAsync();
    }

    public async Task<RefreshToken?> GetRefreshTokenAsync(string refreshToken)
    {
        var token = await _dbContext.RefreshTokens.FirstOrDefaultAsync(t =>
            t.Token == refreshToken && t.RevokedAt == null && t.ExpiresAt > DateTime.UtcNow
        );
        return token;
    }

    public async Task<int> DeleteExpiredAndRevokedAsync(
        DateTime cutoffUtc,
        CancellationToken cancellationToken = default
    )
    {
        return await _dbContext
            .RefreshTokens.Where(t =>
                (t.ExpiresAt < cutoffUtc) || (t.RevokedAt != null && t.RevokedAt < cutoffUtc)
            )
            .ExecuteDeleteAsync(cancellationToken);
    }
}
