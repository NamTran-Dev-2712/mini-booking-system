import {
  BookOpen,
  CalendarDays,
  CheckCircle,
  Clock,
  DollarSign,
  GraduationCap,
  TrendingUp,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Skeleton } from "~/components/ui/skeleton";
import { AreaChartCard } from "~/components/shared/dashboard/area-chart-card";
import { StatCard } from "~/components/shared/dashboard/stat-card";
import { useMentorDashboardQuery } from "~/hooks/dashboard/use-mentor-dashboard-query";
import { useMyMentorProfile } from "~/hooks/mentor/use-my-mentor-profile";
import { useCurrentUser } from "~/hooks/use-auth";
import { SLOT_STATUS, SLOT_STATUS_LABEL } from "~/types/mentor/mentor";

export function meta() {
  return [{ title: "Mentor Dashboard — MiniBooking" }];
}

function formatPrice(price: number) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(price);
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
    notation: "compact",
  }).format(value);
}

function formatSlotTime(iso: string) {
  return new Date(iso).toLocaleString("vi-VN", {
    weekday: "short",
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
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
      <Skeleton className="h-48" />
    </div>
  );
}

export default function MentorDashboard() {
  const { t } = useTranslation("dashboard");
  const { t: tm } = useTranslation("mentor");
  const user = useCurrentUser();
  const navigate = useNavigate();
  const { mentor, isPending: isMentorPending } = useMyMentorProfile();
  const { data, isPending: isDashboardPending } = useMentorDashboardQuery();

  if (isMentorPending || isDashboardPending) return <DashboardSkeleton />;

  const now = new Date();
  const upcomingSlots = (mentor?.slots ?? [])
    .filter(
      (s) => s.status === SLOT_STATUS.Available && new Date(s.startTime) > now,
    )
    .sort(
      (a, b) =>
        new Date(a.startTime).getTime() - new Date(b.startTime).getTime(),
    )
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">
          {t("welcome", { name: user?.fullName })}
        </h2>
        <p className="text-muted-foreground">{t("mentorSubtitle")}</p>
      </div>

      {/* Stats from API */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={BookOpen}
          label={t("stats.totalBookings")}
          value={data?.totalBookings ?? 0}
        />
        <StatCard
          icon={CalendarDays}
          label={t("stats.upcomingSlots")}
          value={data?.upcomingSlots ?? 0}
        />
        <StatCard
          icon={CheckCircle}
          label={t("stats.completed")}
          value={data?.completedSessions ?? 0}
        />
        <StatCard
          icon={DollarSign}
          label={t("stats.revenue")}
          value={formatCurrency(data?.totalRevenue ?? 0)}
        />
      </div>

      {/* Booking Trend Chart */}
      <AreaChartCard
        title={t("charts.bookingTrend")}
        data={data?.bookingTrend ?? []}
        color="var(--chart-4)"
      />

      {/* Upcoming slots */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <CardTitle className="text-base">
            {t("upcomingSessions.title")}
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/mentor/schedule")}
          >
            {t("upcomingSessions.viewAll")}
          </Button>
        </CardHeader>
        <CardContent>
          {upcomingSlots.length === 0 ? (
            <div className="flex flex-col items-center py-8 text-center">
              <CalendarDays className="mb-3 size-8 text-muted-foreground/50" />
              <p className="text-sm text-muted-foreground">
                {t("upcomingSessions.empty")}
              </p>
              <Button
                variant="outline"
                size="sm"
                className="mt-3"
                onClick={() => navigate("/mentor/schedule")}
              >
                {t("quickActions.createSlot")}
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {upcomingSlots.map((slot) => (
                <div
                  key={slot.id}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <Clock className="size-3.5 text-muted-foreground" />
                      <span>{formatSlotTime(slot.startTime)}</span>
                      <span className="text-muted-foreground">—</span>
                      <span>{formatSlotTime(slot.endTime)}</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <DollarSign className="size-3" />
                        {formatPrice(slot.price)}
                      </span>
                      <span>
                        {slot.currentBookings}/{slot.maxBookings}{" "}
                        {tm("bookings.booked")}
                      </span>
                    </div>
                  </div>
                  <Badge variant="default" className="text-xs">
                    {SLOT_STATUS_LABEL[slot.status]}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick actions */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">{t("quickActions.title")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5"
              onClick={() => navigate("/mentor/schedule")}
            >
              <CalendarDays className="size-4" />
              {t("quickActions.createSlot")}
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5"
              onClick={() => navigate("/mentor/skills")}
            >
              <GraduationCap className="size-4" />
              {t("quickActions.manageSkills")}
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5"
              onClick={() => navigate("/mentor/profile")}
            >
              <TrendingUp className="size-4" />
              {t("quickActions.viewProfile")}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
