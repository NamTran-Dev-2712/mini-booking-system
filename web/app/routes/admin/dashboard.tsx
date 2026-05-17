import { BookOpen, CalendarDays, DollarSign, Users } from "lucide-react";
import { Skeleton } from "~/components/ui/skeleton";
import { AreaChartCard } from "~/components/shared/dashboard/area-chart-card";
import { BarChartCard } from "~/components/shared/dashboard/bar-chart-card";
import { StatCard } from "~/components/shared/dashboard/stat-card";
import { useAdminDashboardQuery } from "~/hooks/dashboard/use-admin-dashboard-query";

export function meta() {
  return [{ title: "Admin Dashboard — MiniBooking" }];
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
      <div className="grid gap-4 lg:grid-cols-2">
        <Skeleton className="h-[280px]" />
        <Skeleton className="h-[280px]" />
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const { data, isPending } = useAdminDashboardQuery();

  if (isPending) return <DashboardSkeleton />;

  const bookingStatusData = Object.entries(data?.bookingsByStatus ?? {}).map(
    ([label, value]) => ({ label, value }),
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          System overview and key metrics.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={Users}
          label="Total Users"
          value={data?.totalUsers ?? 0}
        />
        <StatCard
          icon={Users}
          label="Total Mentors"
          value={data?.totalMentors ?? 0}
        />
        <StatCard
          icon={BookOpen}
          label="Total Bookings"
          value={data?.totalBookings ?? 0}
        />
        <StatCard
          icon={DollarSign}
          label="Total Revenue"
          value={formatCurrency(data?.totalRevenue ?? 0)}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <BarChartCard
          title="Bookings by Status"
          data={bookingStatusData}
          color="var(--chart-2)"
        />
        <AreaChartCard
          title="Revenue Over Time"
          data={data?.revenueOverTime ?? []}
          color="var(--chart-1)"
          valueFormatter={(v) => formatCurrency(v)}
        />
      </div>
    </div>
  );
}
