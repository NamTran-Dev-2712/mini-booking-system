public class PasswordResetToken : BaseEntity
{
    public Guid UserId { get; set; }
    public string TokenHash { get; set; } = default!;
    public string OtpCodeHash { get; set; } = default!;
    public DateTime ExpiresAt { get; set; }
    public DateTime? ConsumedAt { get; set; }
    public int Attempts { get; set; } = 0;
    public bool IsConsumed => ConsumedAt != null;
    public bool IsExpired => DateTime.UtcNow > ExpiresAt;
}
