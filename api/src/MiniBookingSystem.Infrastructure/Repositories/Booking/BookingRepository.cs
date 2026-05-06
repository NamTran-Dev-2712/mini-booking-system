using Microsoft.EntityFrameworkCore;

public class BookingRepository : GenericRepository<Booking>, IBookingRepository
{
    public BookingRepository(ApplicationDbContext context)
        : base(context) { }

    public async Task<List<Booking>> GetExpiredPendingBookingsAsync(
        DateTime now,
        CancellationToken ct = default
    )
    {
        return await _context
            .Bookings.Where(b => b.Status == BookingStatus.PendingPayment && b.ExpiresAt <= now)
            .ToListAsync(ct);
    }

    public Task<bool> HasActiveBookingAsync(
        Guid userId,
        Guid mentorSlotId,
        CancellationToken ct = default
    )
    {
        return _context.Bookings.AnyAsync(
            b =>
                b.UserId == userId
                && b.MentorSlotId == mentorSlotId
                && (
                    b.Status == BookingStatus.PendingPayment || b.Status == BookingStatus.Confirmed
                ),
            ct
        );
    }

    public async Task<Guid> UpdateAsync(
        Booking booking,
        CancellationToken cancellationToken = default
    )
    {
        var existingBooking = await _context.Bookings.FindAsync(
            new object[] { booking.Id },
            cancellationToken
        );
        if (existingBooking == null)
        {
            throw new KeyNotFoundException($"Booking with ID {booking.Id} not found.");
        }

        _context.Bookings.Update(booking);
        return booking.Id;
    }
}
