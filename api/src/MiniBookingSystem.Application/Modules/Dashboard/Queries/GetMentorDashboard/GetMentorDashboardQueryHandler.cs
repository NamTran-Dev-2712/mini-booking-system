using MediatR;

public class GetMentorDashboardQueryHandler
    : IRequestHandler<GetMentorDashboardQuery, MentorDashboardDTO>
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly ICacheService _cacheService;

    public GetMentorDashboardQueryHandler(IUnitOfWork unitOfWork, ICacheService cacheService)
    {
        _unitOfWork = unitOfWork;
        _cacheService = cacheService;
    }

    public async Task<MentorDashboardDTO> Handle(
        GetMentorDashboardQuery request,
        CancellationToken cancellationToken
    )
    {
        var cacheKey = CacheKeys.MentorDashboard(request.UserId);
        var cached = await _cacheService.GetAsync<MentorDashboardDTO>(cacheKey);
        if (cached is not null)
            return cached;

        var mentor = await _unitOfWork.Mentor.GetByUserIdAsync(request.UserId, cancellationToken);
        if (mentor is null)
            throw new NotFoundException("Mentor profile", request.UserId.ToString());

        var now = DateTime.UtcNow;
        var fromDate = now.AddMonths(-request.Months);

        var upcomingSlots = await _unitOfWork.MentorSlot.CountAsync(s =>
            s.MentorId == mentor.Id && s.Status == MentorSlotStatus.Available && s.StartTime > now
        );

        var mentorSlotIds = _unitOfWork
            .MentorSlot.Query()
            .Where(s => s.MentorId == mentor.Id)
            .Select(s => s.Id);

        var bookingQuery = _unitOfWork
            .Booking.Query()
            .Where(b => mentorSlotIds.Contains(b.MentorSlotId));

        var totalBookings = await _unitOfWork.Booking.CountAsync(bookingQuery, cancellationToken);

        var completedSessions = await _unitOfWork.Booking.CountAsync(
            bookingQuery.Where(b => b.Status == BookingStatus.Completed),
            cancellationToken
        );

        var bookingIds = bookingQuery.Select(b => b.Id);

        var revenueList =
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

        var totalRevenue = revenueList.FirstOrDefault();

        var bookingTrendRaw =
            await _unitOfWork.Booking.ToListAsync(
                bookingQuery
                    .Where(b => b.BookedAt >= fromDate)
                    .Select(b => new { b.BookedAt.Year, b.BookedAt.Month }),
                cancellationToken
            ) ?? [];

        var bookingTrend = bookingTrendRaw
            .GroupBy(b => new { b.Year, b.Month })
            .Select(g => new TimeSeriesPoint($"{g.Key.Year}-{g.Key.Month:D2}", g.Count()))
            .OrderBy(t => t.Label)
            .ToList();

        var result = new MentorDashboardDTO(
            totalBookings,
            upcomingSlots,
            completedSessions,
            totalRevenue,
            bookingTrend
        );

        await _cacheService.SetAsync(cacheKey, result, TimeSpan.FromMinutes(3));

        return result;
    }
}
