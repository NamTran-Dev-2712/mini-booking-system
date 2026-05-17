public record UserDashboardDTO(
    int TotalBookings,
    int UpcomingBookings,
    int CompletedSessions,
    decimal TotalSpending,
    List<TimeSeriesPoint> BookingHistory
);
