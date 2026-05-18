public static class PhoneNumberNormalizer
{
    public static string Normalize(string phoneNumber)
    {
        if (string.IsNullOrWhiteSpace(phoneNumber))
            return phoneNumber;

        var trimmed = phoneNumber.Trim();

        if (trimmed.StartsWith("+84"))
            return "0" + trimmed[3..];

        if (trimmed.StartsWith("84") && trimmed.Length == 11)
            return "0" + trimmed[2..];

        return trimmed;
    }
}
