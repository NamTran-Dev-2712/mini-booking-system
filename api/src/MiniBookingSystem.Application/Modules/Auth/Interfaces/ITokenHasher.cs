public interface ITokenHasher
{
    string HashToken(string token);
    bool VerifyToken(string providedToken, string hashedToken);
}
