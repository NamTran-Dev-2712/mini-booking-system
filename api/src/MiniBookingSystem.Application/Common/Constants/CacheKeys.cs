public static class CacheKeys
{
    private const string App = "booking";

    // output cache keys
    public const string PublicMentorListPolicy = "PublicMentorListPolicy";
    public const string PublicListMentorTag = "public-mentor-list";

    // rate limiting keys
    public const string AuthRateLimitPolicy = "AuthPolicy";
    public const string BookingRateLimitPolicy = "BookingPolicy";
    public const string AiRateLimitPolicy = "AiPolicy";

    public static string MentorDetail(Guid mentorId) => $"{App}:mentors:{mentorId}:detail";

    // public static string Availability(Guid mentorId, DateOnly from, DateOnly to) =>
    //     $"{App}:mentors:{mentorId}:availability:{from:yyyyMMdd}:{to:yyyyMMdd}";

    // public static string ServiceList(int page, int pageSize, string? keyword, string? sortBy) =>
    //     $"{App}:services:list:page:{page}:size:{pageSize}:keyword:{Normalize(keyword)}:sort:{Normalize(sortBy)}";

    public static string UserProfile(Guid userId) => $"{App}:users:{userId}:profile";

    public static string PaymentStatus(Guid orderId) => $"{App}:payments:orders:{orderId}:status";

    public static string Idempotency(string module, Guid userId, string key) =>
        $"{App}:idempotency:{module}:user:{userId}:key:{key}";

    public static string BookingLock(Guid mentorId, DateTime startTime, DateTime endTime) =>
        $"{App}:locks:booking:mentor:{mentorId}:from:{startTime:yyyyMMddHHmm}:to:{endTime:yyyyMMddHHmm}";

    public static string TokenBlacklist(string jti) => $"{App}:auth:blacklist:jti:{jti}";

    private static string Normalize(string? value) =>
        string.IsNullOrWhiteSpace(value) ? "none" : value.Trim().ToLowerInvariant();
}
