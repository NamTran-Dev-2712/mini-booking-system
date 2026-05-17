public record AdminDashboardDTO(
    int TotalUsers,
    int TotalMentors,
    int TotalBookings,
    decimal TotalRevenue,
    Dictionary<string, int> BookingsByStatus,
    List<TimeSeriesPoint> RevenueOverTime
);
