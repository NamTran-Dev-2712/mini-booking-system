using System.Security.Cryptography;
using System.Text;

public class TokenHasher : ITokenHasher
{
    public string HashToken(string token)
    {
        var tokenBytes = Encoding.UTF8.GetBytes(token);
        var hashBytes = SHA256.HashData(tokenBytes);

        return Convert.ToBase64String(hashBytes);
    }

    public bool VerifyToken(string providedToken, string hashedToken)
    {
        var hashedProvidedToken = HashToken(providedToken);
        return hashedProvidedToken == hashedToken;
    }
}
