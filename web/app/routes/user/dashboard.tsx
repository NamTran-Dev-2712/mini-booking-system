import { BookOpen, CalendarDays, CheckCircle, DollarSign } from "lucide-react";
import { Skeleton } from "~/components/ui/skeleton";
import { AreaChartCard } from "~/components/shared/dashboard/area-chart-card";
import { StatCard } from "~/components/shared/dashboard/stat-card";
import { useUserDashboardQuery } from "~/hooks/dashboard/use-user-dashboard-query";
import { useCurrentUser } from "~/hooks/use-auth";

export function meta() {
  return [{ title: "Dashboard — MiniBooking" }];
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
    notation: "compact",
  }).format(value);
}

function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-8 w-64" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Skeleton className="h-24" />
        <Skeleton className="h-24" />
        <Skeleton className="h-24" />
        <Skeleton className="h-24" />
      </div>
      <Skeleton className="h-[280px]" />
    </div>
  );
}

export default function UserDashboard() {
  const user = useCurrentUser();
  const { data, isPending } = useUserDashboardQuery();

  if (isPending) return <DashboardSkeleton />;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">
          Welcome, {user?.fullName}
        </h2>
        <p className="text-muted-foreground">
          Your booking overview and activity.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={BookOpen}
          label="Total Bookings"
          value={data?.totalBookings ?? 0}
        />
        <StatCard
          icon={CalendarDays}
          label="Upcoming"
          value={data?.upcomingBookings ?? 0}
        />
        <StatCard
          icon={CheckCircle}
          label="Completed"
          value={data?.completedSessions ?? 0}
        />
        <StatCard
          icon={DollarSign}
          label="Total Spending"
          value={formatCurrency(data?.totalSpending ?? 0)}
        />
      </div>

      <AreaChartCard
        title="Booking History"
        data={data?.bookingHistory ?? []}
        color="var(--chart-3)"
      />
    </div>
  );
}
