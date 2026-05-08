namespace MiniBookingSystem.UnitTests.Common.Builders;

/// <summary>
/// Centralised factory for Payment-related test data objects.
/// Single source of truth for all Payment test fixtures.
/// </summary>
internal static class PaymentTestData
{
    // ── Canonical valid values ─────────────────────────────────────────────
    public static class Valid
    {
        public static readonly Guid PaymentTransactionId = new(
            "ffffffff-ffff-ffff-ffff-ffffffffffff"
        );
        public static readonly Guid BookingId = new("eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee");
        public static readonly Guid UserId = new("bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb");

        public const string OrderCode = "BK-20260509001";
        public const string QrUrl = "https://qr.sepay.vn/img?bank=MB&acc=123456&amount=500000";
        public const decimal Amount = 500_000m;
        public const string PaymentCodePrefix = "BK";
    }

    // ── Entity builders ────────────────────────────────────────────────────

    public static PaymentTransaction BuildPaymentTransaction(
        Guid? id = null,
        Guid? bookingId = null,
        string? orderCode = null,
        PaymentStatus status = PaymentStatus.Pending,
        decimal amount = Valid.Amount,
        DateTime? expiredAt = null
    ) =>
        new()
        {
            Id = id ?? Valid.PaymentTransactionId,
            BookingId = bookingId ?? Valid.BookingId,
            Provider = PaymentProvider.SePay,
            ProviderOrderCode = orderCode ?? Valid.OrderCode,
            Amount = amount,
            Currency = "VND",
            Status = status,
            QrCodeUrl = Valid.QrUrl,
            ExpiredAt = expiredAt ?? DateTime.UtcNow.AddMinutes(30),
        };

    /// <summary>
    /// Builds a PaymentTransaction with a fully-populated Booking navigation property.
    /// </summary>
    public static PaymentTransaction BuildPaymentTransactionWithBooking(
        Guid? id = null,
        Guid? bookingId = null,
        string? orderCode = null,
        PaymentStatus paymentStatus = PaymentStatus.Pending,
        BookingStatus bookingStatus = BookingStatus.PendingPayment,
        DateTime? paymentExpiredAt = null,
        DateTime? bookingExpiresAt = null
    )
    {
        var resolvedBookingId = bookingId ?? Valid.BookingId;
        var payment = BuildPaymentTransaction(
            id,
            resolvedBookingId,
            orderCode,
            paymentStatus,
            expiredAt: paymentExpiredAt
        );
        payment.Booking = BookingTestData.BuildBooking(
            id: resolvedBookingId,
            userId: Valid.UserId,
            status: bookingStatus,
            expiresAt: bookingExpiresAt
        );
        return payment;
    }

    // ── SePay webhook request builder ──────────────────────────────────────

    public static SePayWebhookRequest BuildSePayWebhookRequest(
        long id = 12345,
        string transferType = "in",
        string? code = null,
        string? content = null,
        decimal amount = Valid.Amount
    ) =>
        new()
        {
            Id = id,
            TransferType = transferType,
            Code = code ?? Valid.OrderCode,
            Content = content ?? $"Thanh toan {Valid.OrderCode}",
            TransferAmount = amount,
        };

    // ── Command builders ───────────────────────────────────────────────────

    public static CreatePaymentCommand BuildCreatePaymentCommand(
        Guid? userId = null,
        Guid? bookingId = null,
        PaymentProvider provider = PaymentProvider.SePay,
        string currency = "VND"
    ) =>
        new(
            UserId: userId ?? Valid.UserId,
            BookingId: bookingId ?? Valid.BookingId,
            Provider: provider,
            Currency: currency
        );
}
