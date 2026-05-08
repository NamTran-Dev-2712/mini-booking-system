public static class AiInputGuard
{
    private static readonly string[] OutOfScopePatterns =
    [
        "viết code",
        "write code",
        "lập trình",
        "programming",
        "debug",
        "source code",
        "algorithm",
        "thuật toán",
        "sql injection",
        "xss",
        "csrf",
        "hack",
        "bypass",
        "exploit",
        "chính trị",
        "politics",
        "tôn giáo",
        "religion",
        "thời tiết",
        "weather",
        "tin tức",
        "bóng đá",
        "nấu ăn",
        "công thức nấu",
    ];

    private const string _outOfScopeReply =
        "Xin lỗi, tôi chỉ hỗ trợ các thắc mắc về đặt lịch mentor trong hệ thống Mini Booking. "
        + "Bạn có muốn tôi giúp tìm mentor phù hợp không?";

    public static bool IsOutOfScope(string message)
    {
        var lower = message.ToLowerInvariant();
        return OutOfScopePatterns.Any(p => lower.Contains(p));
    }

    public static string OutOfScopeReply => _outOfScopeReply;
}
