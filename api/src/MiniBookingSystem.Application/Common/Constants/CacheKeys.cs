public static class CacheKeys
{
    private const string App = "booking";

    // output cache policy names
    public const string PublicMentorListPolicy = "PublicMentorListPolicy";
    public const string BookingUserListPolicy = "BookingUserListPolicy";
    public const string BookingAdminListPolicy = "BookingAdminListPolicy";

    // output cache eviction tags
    public const string PublicListMentorTag = "public-mentor-list";
    public const string BookingUserListTag = "booking-user-list";
    public const string BookingAdminListTag = "booking-admin-list";

    // rate limiting keys
    public const string AuthRateLimitPolicy = "AuthPolicy";
    public const string BookingRateLimitPolicy = "BookingPolicy";
    public const string AiRateLimitPolicy = "AiPolicy";

    public static string MentorDetail(Guid mentorId) => $"{App}:mentors:{mentorId}:detail";

    public static string MentorSlots(Guid mentorId) => $"{App}:mentors:{mentorId}:slots";

    public static string UserProfile(Guid userId) => $"{App}:users:{userId}:profile";

    public static string PaymentStatus(Guid orderId) => $"{App}:payments:orders:{orderId}:status";

    public static string Idempotency(string module, Guid userId, string key) =>
        $"{App}:idempotency:{module}:user:{userId}:key:{key}";

    public static string BookingLock(Guid mentorId, DateTime startTime, DateTime endTime) =>
        $"{App}:locks:booking:mentor:{mentorId}:from:{startTime:yyyyMMddHHmm}:to:{endTime:yyyyMMddHHmm}";

    public static string BookingDetail(Guid bookingId) => $"{App}:bookings:{bookingId}:detail";

    public static string TokenBlacklist(string jti) => $"{App}:auth:blacklist:jti:{jti}";

    private static string Normalize(string? value) =>
        string.IsNullOrWhiteSpace(value) ? "none" : value.Trim().ToLowerInvariant();
}
