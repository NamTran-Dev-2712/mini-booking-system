public interface IBookingRepository : IGenericRepository<Booking>
{
    Task<bool> HasActiveBookingAsync(
        Guid userId,
        Guid mentorSlotId,
        CancellationToken ct = default
    );
    Task<List<Booking>> GetExpiredPendingBookingsAsync(
        DateTime now,
        CancellationToken ct = default
    );
    Task<Guid> UpdateAsync(Booking booking, CancellationToken cancellationToken = default);
}
