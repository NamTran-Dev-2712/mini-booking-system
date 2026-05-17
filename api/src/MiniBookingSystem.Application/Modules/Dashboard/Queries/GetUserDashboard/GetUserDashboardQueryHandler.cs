using MediatR;

public class GetUserDashboardQueryHandler : IRequestHandler<GetUserDashboardQuery, UserDashboardDTO>
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly ICacheService _cacheService;

    public GetUserDashboardQueryHandler(IUnitOfWork unitOfWork, ICacheService cacheService)
    {
        _unitOfWork = unitOfWork;
        _cacheService = cacheService;
    }

    public async Task<UserDashboardDTO> Handle(
        GetUserDashboardQuery request,
        CancellationToken cancellationToken
    )
    {
        var cacheKey = CacheKeys.UserDashboard(request.UserId);
        var cached = await _cacheService.GetAsync<UserDashboardDTO>(cacheKey);
        if (cached is not null)
            return cached;

        var now = DateTime.UtcNow;
        var fromDate = now.AddMonths(-request.Months);

        var bookingQuery = _unitOfWork.Booking.Query().Where(b => b.UserId == request.UserId);

        var totalBookings = await _unitOfWork.Booking.CountAsync(bookingQuery, cancellationToken);

        var upcomingBookings = await _unitOfWork.Booking.CountAsync(
            bookingQuery.Where(b =>
                b.Status == BookingStatus.Confirmed && b.MentorSlot.StartTime > now
            ),
            cancellationToken
        );

        var completedSessions = await _unitOfWork.Booking.CountAsync(
            bookingQuery.Where(b => b.Status == BookingStatus.Completed),
            cancellationToken
        );

        var bookingIds = bookingQuery.Select(b => b.Id);

        var spendingList =
            await _unitOfWork.PaymentTransaction.ToListAsync(
                _unitOfWork
                    .PaymentTransaction.Query()
                    .Where(p =>
                        bookingIds.Contains(p.BookingId) && p.Status == PaymentStatus.Succeeded
                    )
                    .GroupBy(p => 1)
                    .Select(g => g.Sum(p => p.Amount)),
                cancellationToken
            ) ?? [];

        var totalSpending = spendingList.FirstOrDefault();

        var bookingHistory =
            await _unitOfWork.Booking.ToListAsync(
                bookingQuery
                    .Where(b => b.BookedAt >= fromDate)
                    .GroupBy(b => new { b.BookedAt.Year, b.BookedAt.Month })
                    .Select(g => new TimeSeriesPoint(
                        g.Key.Year + "-" + g.Key.Month.ToString("D2"),
                        g.Count()
                    ))
                    .OrderBy(t => t.Label),
                cancellationToken
            ) ?? [];

        var result = new UserDashboardDTO(
            totalBookings,
            upcomingBookings,
            completedSessions,
            totalSpending,
            bookingHistory
        );

        await _cacheService.SetAsync(cacheKey, result, TimeSpan.FromMinutes(3));

        return result;
    }
}
