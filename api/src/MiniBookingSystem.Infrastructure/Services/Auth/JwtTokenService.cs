using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

public class JwtTokenService : IJwtTokenService
{
    private readonly JwtOptions _jwtSettings;
    private readonly ITokenHasher _tokenHasher;

    public JwtTokenService(IOptions<JwtOptions> jwtSettings, ITokenHasher tokenHasher)
    {
        _jwtSettings = jwtSettings.Value;
        _tokenHasher = tokenHasher;
    }

    public Task<string> GenerateAccessTokenAsync(UserTokenData user)
    {
        var claims = new List<Claim>
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.UserId.ToString()),
            new Claim(JwtRegisteredClaimNames.Email, user.Email),
            new Claim(JwtRegisteredClaimNames.UniqueName, user.FullName),
        };

        claims.AddRange(user.Roles.Select(role => new Claim(ClaimTypes.Role, role)));

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSettings.Secret));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: _jwtSettings.Issuer,
            audience: _jwtSettings.Audience,
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(_jwtSettings.AccessTokenExpiryMinutes),
            signingCredentials: creds
        );

        return Task.FromResult(new JwtSecurityTokenHandler().WriteToken(token));
    }

    public string GenerateRefreshTokenAsync()
    {
        var randomBytes = new byte[32];
        using (var rng = System.Security.Cryptography.RandomNumberGenerator.Create())
        {
            rng.GetBytes(randomBytes);
            return Convert.ToBase64String(randomBytes);
        }
    }

    public DateTime GetRefreshTokenExpiry()
    {
        return DateTime.UtcNow.AddDays(_jwtSettings.RefreshTokenExpiryDays);
    }

    public DateTime GetAccessTokenExpiry()
    {
        return DateTime.UtcNow.AddMinutes(_jwtSettings.AccessTokenExpiryMinutes);
    }

    public async Task<TokenResult> GenerateTokensAsync(UserTokenData user)
    {
        var accessToken = await GenerateAccessTokenAsync(user);

        var refreshToken = GenerateRefreshTokenAsync();

        var refreshTokenHash = _tokenHasher.HashToken(refreshToken);

        var refreshTokenExpiry = GetRefreshTokenExpiry();

        return new TokenResult(accessToken, refreshToken, refreshTokenHash, refreshTokenExpiry);
    }
}
