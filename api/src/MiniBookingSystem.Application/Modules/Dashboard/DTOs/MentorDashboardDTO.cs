public record MentorDashboardDTO(
    int TotalBookings,
    int UpcomingSlots,
    int CompletedSessions,
    decimal TotalRevenue,
    List<TimeSeriesPoint> BookingTrend
);
