import { BookOpen, CalendarDays, Clock, DollarSign, User } from "lucide-react";
import { useSearchParams } from "react-router";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { Skeleton } from "~/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { useMyMentorProfile } from "~/hooks/mentor/use-my-mentor-profile";
import {
  BookingStatus,
  BOOKING_STATUS_LABEL,
  type BookingStatusValue,
} from "~/types/booking/booking";
import {
  SLOT_STATUS,
  SLOT_STATUS_LABEL,
  type MentorSlot,
} from "~/types/mentor/mentor";

export function meta() {
  return [{ title: "Bookings — MiniBooking" }];
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

function formatPrice(price: number) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(price);
}

const SLOT_FILTER_TABS: { label: string; value: string; filter?: number }[] = [
  { label: "All", value: "all" },
  { label: "Available", value: "available", filter: SLOT_STATUS.Available },
  { label: "Fully Booked", value: "booked", filter: SLOT_STATUS.FullyBooked },
  { label: "Completed", value: "completed", filter: SLOT_STATUS.Completed },
];

function SlotBookingCard({ slot }: { slot: MentorSlot }) {
  const isFuture = new Date(slot.startTime) > new Date();

  const statusVariant: Record<
    number,
    "default" | "secondary" | "destructive" | "outline"
  > = {
    [SLOT_STATUS.Available]: "default",
    [SLOT_STATUS.FullyBooked]: "secondary",
    [SLOT_STATUS.Blocked]: "outline",
    [SLOT_STATUS.Cancelled]: "destructive",
    [SLOT_STATUS.Completed]: "outline",
  };

  return (
    <Card className={!isFuture ? "opacity-70" : ""}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0 flex-1 space-y-1">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Clock className="size-3.5 text-muted-foreground" />
              <span>{formatSlotTime(slot.startTime)}</span>
              <span className="text-muted-foreground">—</span>
              <span>{formatSlotTime(slot.endTime)}</span>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1 font-medium text-foreground">
                <DollarSign className="size-3" />
                {formatPrice(slot.price)}
              </span>
              <span className="flex items-center gap-1">
                <User className="size-3" />
                {slot.currentBookings}/{slot.maxBookings} booked
              </span>
              {slot.description && (
                <span className="truncate max-w-[200px]">
                  {slot.description}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {slot.currentBookings > 0 && (
              <Badge variant="outline" className="text-xs gap-1">
                <User className="size-3" />
                {slot.currentBookings}
              </Badge>
            )}
            <Badge
              variant={statusVariant[slot.status] ?? "secondary"}
              className="text-xs"
            >
              {SLOT_STATUS_LABEL[slot.status]}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function MentorBookings() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { mentor, isPending } = useMyMentorProfile();

  const activeTab = searchParams.get("filter") ?? "all";
  const statusFilter = SLOT_FILTER_TABS.find(
    (t) => t.value === activeTab,
  )?.filter;

  const allSlots = mentor?.slots ?? [];
  const filteredSlots =
    statusFilter != null
      ? allSlots.filter((s) => s.status === statusFilter)
      : allSlots;

  const sorted = [...filteredSlots].sort(
    (a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime(),
  );

  const totalBookings = allSlots.reduce((sum, s) => sum + s.currentBookings, 0);

  function handleTabChange(value: string) {
    const params = new URLSearchParams();
    if (value !== "all") params.set("filter", value);
    setSearchParams(params, { replace: true });
  }

  if (isPending) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-10 w-64" />
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-20" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Bookings</h2>
        <p className="text-muted-foreground">
          View sessions booked with you.
          {totalBookings > 0 && (
            <span className="ml-1 font-medium text-foreground">
              {totalBookings} total booking{totalBookings !== 1 ? "s" : ""}
            </span>
          )}
        </p>
      </div>

      {/* Filter tabs */}
      <Tabs value={activeTab} onValueChange={handleTabChange}>
        <TabsList className="w-full justify-start overflow-x-auto">
          {SLOT_FILTER_TABS.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="text-xs sm:text-sm"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Slots with booking info */}
      {sorted.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-16 text-center">
          <BookOpen className="mb-4 size-10 text-muted-foreground/50" />
          <p className="text-sm font-medium text-muted-foreground">
            {activeTab === "all"
              ? "No bookings yet"
              : "No slots with this status"}
          </p>
          <p className="mt-1 text-xs text-muted-foreground/70">
            Create time slots to start receiving bookings from students.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {sorted.map((slot) => (
            <SlotBookingCard key={slot.id} slot={slot} />
          ))}
        </div>
      )}
    </div>
  );
}
