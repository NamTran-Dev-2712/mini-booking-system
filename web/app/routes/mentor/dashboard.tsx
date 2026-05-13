import {
  CalendarDays,
  Clock,
  DollarSign,
  GraduationCap,
  TrendingUp,
  Users,
} from "lucide-react";
import { useNavigate } from "react-router";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Skeleton } from "~/components/ui/skeleton";
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

function formatSlotTime(iso: string) {
  return new Date(iso).toLocaleString("vi-VN", {
    weekday: "short",
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string | number;
}) {
  return (
    <Card>
      <CardContent className="flex items-center gap-4 p-5">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
          <Icon className="size-5 text-primary" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-8 w-64" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Skeleton className="h-24" />
        <Skeleton className="h-24" />
        <Skeleton className="h-24" />
      </div>
      <Skeleton className="h-48" />
    </div>
  );
}

export default function MentorDashboard() {
  const user = useCurrentUser();
  const navigate = useNavigate();
  const { mentor, isPending } = useMyMentorProfile();

  if (isPending) return <DashboardSkeleton />;

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

  const totalBookedSlots = (mentor?.slots ?? []).reduce(
    (sum, s) => sum + s.currentBookings,
    0,
  );

  const skillsCount = mentor?.skills.length ?? 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">
          Welcome, {user?.fullName}
        </h2>
        <p className="text-muted-foreground">
          Manage your sessions and availability.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          icon={CalendarDays}
          label="Upcoming Sessions"
          value={upcomingSlots.length}
        />
        <StatCard
          icon={Users}
          label="Total Bookings"
          value={totalBookedSlots}
        />
        <StatCard
          icon={GraduationCap}
          label="Active Skills"
          value={skillsCount}
        />
      </div>

      {/* Upcoming slots */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <CardTitle className="text-base">Upcoming Sessions</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/mentor/schedule")}
          >
            View all
          </Button>
        </CardHeader>
        <CardContent>
          {upcomingSlots.length === 0 ? (
            <div className="flex flex-col items-center py-8 text-center">
              <CalendarDays className="mb-3 size-8 text-muted-foreground/50" />
              <p className="text-sm text-muted-foreground">
                No upcoming sessions. Create a slot to get started.
              </p>
              <Button
                variant="outline"
                size="sm"
                className="mt-3"
                onClick={() => navigate("/mentor/schedule")}
              >
                Manage Schedule
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
                        {slot.currentBookings}/{slot.maxBookings} booked
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
          <CardTitle className="text-base">Quick Actions</CardTitle>
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
              Create Slot
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5"
              onClick={() => navigate("/mentor/skills")}
            >
              <GraduationCap className="size-4" />
              Manage Skills
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5"
              onClick={() => navigate("/mentor/profile")}
            >
              <TrendingUp className="size-4" />
              View Profile
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
