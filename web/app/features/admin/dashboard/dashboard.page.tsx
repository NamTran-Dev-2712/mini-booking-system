import { BookOpen, DollarSign, Users } from "lucide-react";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation("dashboard");
  const { data, isPending } = useAdminDashboardQuery();

  if (isPending) return <DashboardSkeleton />;

  const bookingStatusData = Object.entries(data?.bookingsByStatus ?? {}).map(
    ([label, value]) => ({ label, value }),
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">{t("title")}</h2>
        <p className="text-muted-foreground">{t("subtitle")}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={Users}
          label={t("stats.totalUsers")}
          value={data?.totalUsers ?? 0}
        />
        <StatCard
          icon={Users}
          label={t("stats.totalMentors")}
          value={data?.totalMentors ?? 0}
        />
        <StatCard
          icon={BookOpen}
          label={t("stats.totalBookings")}
          value={data?.totalBookings ?? 0}
        />
        <StatCard
          icon={DollarSign}
          label={t("stats.totalRevenue")}
          value={formatCurrency(data?.totalRevenue ?? 0)}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <BarChartCard
          title={t("charts.bookingsByStatus")}
          data={bookingStatusData}
          color="var(--chart-2)"
        />
        <AreaChartCard
          title={t("charts.revenueOverTime")}
          data={data?.revenueOverTime ?? []}
          color="var(--chart-1)"
          valueFormatter={(v) => formatCurrency(v)}
        />
      </div>
    </div>
  );
}
