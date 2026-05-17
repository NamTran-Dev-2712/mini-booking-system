export interface TimeSeriesPoint {
  label: string;
  value: number;
}

export interface AdminDashboardResponse {
  totalUsers: number;
  totalMentors: number;
  totalBookings: number;
  totalRevenue: number;
  bookingsByStatus: Record<string, number>;
  revenueOverTime: TimeSeriesPoint[];
}

export interface MentorDashboardResponse {
  totalBookings: number;
  upcomingSlots: number;
  completedSessions: number;
  totalRevenue: number;
  bookingTrend: TimeSeriesPoint[];
}

export interface UserDashboardResponse {
  totalBookings: number;
  upcomingBookings: number;
  completedSessions: number;
  totalSpending: number;
  bookingHistory: TimeSeriesPoint[];
}
