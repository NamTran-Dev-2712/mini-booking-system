using System.Security.Cryptography;

public static class PasswordGenerator
{
    private const string Uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    private const string Lowercase = "abcdefghijklmnopqrstuvwxyz";
    private const string Digits = "0123456789";
    private const string Special = "!@#$%^&*()_+-=[]{}|;:,.<>?";

    public static string Generate(int length = 16)
    {
        if (length < 8)
            throw new ArgumentException("Password length must be at least 8.", nameof(length));

        Span<char> password = stackalloc char[length];

        password[0] = Uppercase[RandomNumberGenerator.GetInt32(Uppercase.Length)];
        password[1] = Lowercase[RandomNumberGenerator.GetInt32(Lowercase.Length)];
        password[2] = Digits[RandomNumberGenerator.GetInt32(Digits.Length)];
        password[3] = Special[RandomNumberGenerator.GetInt32(Special.Length)];

        var all = Uppercase + Lowercase + Digits + Special;
        for (int i = 4; i < length; i++)
            password[i] = all[RandomNumberGenerator.GetInt32(all.Length)];

        for (int i = length - 1; i > 0; i--)
        {
            int j = RandomNumberGenerator.GetInt32(i + 1);
            (password[i], password[j]) = (password[j], password[i]);
        }

        return new string(password);
    }
}
