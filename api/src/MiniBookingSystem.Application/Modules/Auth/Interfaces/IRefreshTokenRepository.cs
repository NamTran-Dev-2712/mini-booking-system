public interface IRefreshTokenRepository : IGenericRepository<RefreshToken>
{
    Task<RefreshToken?> GetRefreshTokenAsync(string refreshToken);
    Task UpdateRefreshTokenAsync(string userId, string refreshToken, DateTime expiryTime);

    Task RemoveRefreshTokenAsync(string userId);
}
