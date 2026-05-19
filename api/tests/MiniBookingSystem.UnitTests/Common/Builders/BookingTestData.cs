namespace MiniBookingSystem.UnitTests.Common.Builders;

/// <summary>
/// Centralised factory for Booking-related test data objects.
/// Single source of truth for all Booking test fixtures.
/// </summary>
internal static class BookingTestData
{
    // ── Canonical valid values ─────────────────────────────────────────────
    public static class Valid
    {
        public static readonly Guid BookingId = new("eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee");
        public static readonly Guid UserId = new("bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb");
        public static readonly Guid SlotId = new("cccccccc-cccc-cccc-cccc-cccccccccccc");

        public const string BookingCode = "BOOKING0001";
        public const string CancellationReason = "Schedule conflict, cannot attend the session.";
        public const string Notes = "Please prepare backend interview topics.";
        public const string IdempotencyKey = "idem-key-abc123";
    }

    // ── Entity builders ────────────────────────────────────────────────────

    public static Booking BuildBooking(
        Guid? id = null,
        Guid? userId = null,
        Guid? mentorSlotId = null,
        BookingStatus status = BookingStatus.PendingPayment,
        DateTime? expiresAt = null
    ) =>
        new()
        {
            Id = id ?? Valid.BookingId,
            UserId = userId ?? Valid.UserId,
            MentorSlotId = mentorSlotId ?? Valid.SlotId,
            Status = status,
            BookingCode = Valid.BookingCode,
            BookedAt = DateTime.UtcNow,
            ExpiresAt = expiresAt ?? DateTime.UtcNow.AddMinutes(15),
        };

    /// <summary>
    /// Builds a Booking with fully-populated navigation properties so LINQ projections work
    /// against in-memory data (e.g., b.MentorSlot.Mentor.DisplayName).
    /// </summary>
    public static Booking BuildBookingWithNavigation(
        Guid? id = null,
        Guid? userId = null,
        BookingStatus status = BookingStatus.PendingPayment,
        string? bookingCode = null,
        string? cancellationReason = null
    )
    {
        var mentor = MentorTestData.BuildMentor(id: MentorTestData.Valid.MentorId);
        var slot = MentorTestData.BuildMentorSlot(
            id: Valid.SlotId,
            mentorId: MentorTestData.Valid.MentorId
        );
        slot.Mentor = mentor;

        return new Booking
        {
            Id = id ?? Valid.BookingId,
            UserId = userId ?? Valid.UserId,
            MentorSlotId = Valid.SlotId,
            Status = status,
            BookingCode = bookingCode ?? Valid.BookingCode,
            BookedAt = DateTime.UtcNow,
            ExpiresAt = DateTime.UtcNow.AddMinutes(15),
            CancellationReason = cancellationReason,
            MentorSlot = slot,
        };
    }

    // ── DTO builder ────────────────────────────────────────────────────────

    public static BookingDto BuildBookingDto(
        Guid? id = null,
        Guid? userId = null,
        BookingStatus status = BookingStatus.PendingPayment
    ) =>
        new()
        {
            Id = id ?? Valid.BookingId,
            UserId = userId ?? Valid.UserId,
            BookingCode = Valid.BookingCode,
            Status = status,
            CreatedAt = DateTime.UtcNow,
            MentorSlot = new MentorSlotDTO
            {
                Id = Valid.SlotId,
                Name = "Test Slot",
                StartTime = DateTime.UtcNow.AddDays(1),
                EndTime = DateTime.UtcNow.AddDays(1).AddHours(1),
                Status = MentorSlotStatus.Available,
                Price = MentorTestData.Valid.BasePrice,
            },
            Mentor = new MentorDto
            {
                Id = MentorTestData.Valid.MentorId,
                UserId = MentorTestData.Valid.UserId,
                DisplayName = MentorTestData.Valid.DisplayName,
                Email = MentorTestData.Valid.Email,
                Bio = MentorTestData.Valid.Bio,
                Specialization = MentorTestData.Valid.Specialization,
                ExperienceYears = MentorTestData.Valid.ExperienceYears,
                BasePrice = MentorTestData.Valid.BasePrice,
                IsActive = true,
            },
        };

    // ── Command builders ───────────────────────────────────────────────────

    public static CreateBookingCommand BuildCreateBookingCommand(
        Guid? userId = null,
        Guid? mentorSlotId = null,
        string? notes = null,
        string? idempotencyKey = null
    ) =>
        new(
            UserId: userId ?? Valid.UserId,
            MentorSlotId: mentorSlotId ?? Valid.SlotId,
            Notes: notes,
            IdempotencyKey: idempotencyKey
        );

    public static CancelBookingCommand BuildCancelBookingCommand(
        Guid? userId = null,
        Guid? bookingId = null,
        string? reason = null
    ) =>
        new(
            UserId: userId ?? Valid.UserId,
            BookingId: bookingId ?? Valid.BookingId,
            CancellationReason: reason ?? Valid.CancellationReason
        );
}
