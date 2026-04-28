public interface IJwtTokenService
{
    Task<string> GenerateAccessTokenAsync(UserTokenData user);
    string GenerateRefreshTokenAsync();
    Task<TokenResult> GenerateTokensAsync(UserTokenData user);
    DateTime GetRefreshTokenExpiry();
    DateTime GetAccessTokenExpiry();
}
