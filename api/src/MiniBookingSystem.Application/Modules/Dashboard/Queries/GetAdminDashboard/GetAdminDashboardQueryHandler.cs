using MediatR;

public class GetAdminDashboardQueryHandler
    : IRequestHandler<GetAdminDashboardQuery, AdminDashboardDTO>
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly ICacheService _cacheService;

    public GetAdminDashboardQueryHandler(IUnitOfWork unitOfWork, ICacheService cacheService)
    {
        _unitOfWork = unitOfWork;
        _cacheService = cacheService;
    }

    public async Task<AdminDashboardDTO> Handle(
        GetAdminDashboardQuery request,
        CancellationToken cancellationToken
    )
    {
        var cacheKey = CacheKeys.AdminDashboard();
        var cached = await _cacheService.GetAsync<AdminDashboardDTO>(cacheKey);
        if (cached is not null)
            return cached;

        var totalUsers = await _unitOfWork.User.CountActiveAsync(cancellationToken);

        var totalMentors = await _unitOfWork.Mentor.CountAsync(m => m.IsActive);

        var bookingQuery = _unitOfWork.Booking.Query();

        var totalBookings = await _unitOfWork.Booking.CountAsync(bookingQuery, cancellationToken);

        var bookingsByStatus =
            await _unitOfWork.Booking.ToListAsync(
                bookingQuery
                    .GroupBy(b => b.Status)
                    .Select(g => new { Status = g.Key, Count = g.Count() }),
                cancellationToken
            ) ?? [];

        var bookingStatusDict = bookingsByStatus.ToDictionary(
            x => x.Status.ToString(),
            x => x.Count
        );

        var fromDate = DateTime.UtcNow.AddMonths(-request.Months);

        var paymentQuery = _unitOfWork
            .PaymentTransaction.Query()
            .Where(p => p.Status == PaymentStatus.Succeeded);

        var totalRevenue =
            await _unitOfWork.PaymentTransaction.ToListAsync(
                paymentQuery.GroupBy(p => 1).Select(g => g.Sum(p => p.Amount)),
                cancellationToken
            ) ?? [];

        var revenueOverTime =
            await _unitOfWork.PaymentTransaction.ToListAsync(
                paymentQuery
                    .Where(p => p.PaidAt != null && p.PaidAt >= fromDate)
                    .GroupBy(p => new { p.PaidAt!.Value.Year, p.PaidAt!.Value.Month })
                    .Select(g => new TimeSeriesPoint(
                        g.Key.Year + "-" + g.Key.Month.ToString("D2"),
                        g.Sum(p => p.Amount)
                    ))
                    .OrderBy(t => t.Label),
                cancellationToken
            ) ?? [];

        var result = new AdminDashboardDTO(
            totalUsers,
            totalMentors,
            totalBookings,
            totalRevenue.FirstOrDefault(),
            bookingStatusDict,
            revenueOverTime
        );

        await _cacheService.SetAsync(cacheKey, result, TimeSpan.FromMinutes(3));

        return result;
    }
}
