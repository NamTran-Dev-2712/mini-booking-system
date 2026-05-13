import { format, isSameDay } from "date-fns";
import {
  CalendarDays,
  Clock,
  DollarSign,
  Edit,
  Filter,
  Plus,
  Users,
} from "lucide-react";
import { useState } from "react";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { Skeleton } from "~/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { MentorSlotForm } from "~/features/admin/mentor/components/mentor-slot-form";
import { useMyMentorProfile } from "~/hooks/mentor/use-my-mentor-profile";
import {
  SLOT_STATUS,
  SLOT_STATUS_LABEL,
  type MentorSlot,
} from "~/types/mentor/mentor";

export function meta() {
  return [{ title: "My Schedule — MiniBooking" }];
}

function formatPrice(price: number) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(price);
}

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

const STATUS_VARIANT: Record<
  number,
  "default" | "secondary" | "destructive" | "outline"
> = {
  [SLOT_STATUS.Available]: "default",
  [SLOT_STATUS.FullyBooked]: "secondary",
  [SLOT_STATUS.Blocked]: "outline",
  [SLOT_STATUS.Cancelled]: "destructive",
  [SLOT_STATUS.Completed]: "outline",
};

type FilterTab = "upcoming" | "past" | "all";

export default function MentorSchedule() {
  const { mentor, mentorId, isPending } = useMyMentorProfile();
  const [createOpen, setCreateOpen] = useState(false);
  const [editSlot, setEditSlot] = useState<MentorSlot | null>(null);
  const [filter, setFilter] = useState<FilterTab>("upcoming");

  if (isPending) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-10 w-64" />
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-24" />
          ))}
        </div>
      </div>
    );
  }

  const now = new Date();
  const allSlots = mentor?.slots ?? [];

  const filteredSlots = allSlots.filter((slot) => {
    const slotTime = new Date(slot.startTime);
    if (filter === "upcoming") return slotTime > now;
    if (filter === "past") return slotTime <= now;
    return true;
  });

  const sorted = [...filteredSlots].sort((a, b) => {
    if (filter === "past") {
      return new Date(b.startTime).getTime() - new Date(a.startTime).getTime();
    }
    return new Date(a.startTime).getTime() - new Date(b.startTime).getTime();
  });

  const groups: { date: Date; slots: MentorSlot[] }[] = [];
  for (const slot of sorted) {
    const slotDate = new Date(slot.startTime);
    const existing = groups.find((g) => isSameDay(g.date, slotDate));
    if (existing) {
      existing.slots.push(slot);
    } else {
      groups.push({ date: slotDate, slots: [slot] });
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">My Schedule</h2>
          <p className="text-muted-foreground">
            Manage your available time slots.
          </p>
        </div>
        <Button
          onClick={() => setCreateOpen(true)}
          className="gap-1.5 self-start sm:self-auto"
        >
          <Plus className="size-4" />
          New Slot
        </Button>
      </div>

      {/* Filter tabs */}
      <Tabs value={filter} onValueChange={(v) => setFilter(v as FilterTab)}>
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
          <TabsTrigger value="all">All</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Slot groups */}
      {groups.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-16 text-center">
          <CalendarDays className="mb-4 size-10 text-muted-foreground/50" />
          <p className="text-sm font-medium text-muted-foreground">
            {filter === "upcoming"
              ? "No upcoming slots"
              : filter === "past"
                ? "No past slots"
                : "No slots created yet"}
          </p>
          <p className="mt-1 text-xs text-muted-foreground/70">
            Create a slot to start accepting bookings.
          </p>
          <Button
            variant="outline"
            size="sm"
            className="mt-4"
            onClick={() => setCreateOpen(true)}
          >
            Create first slot
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {groups.map((group) => (
            <div key={group.date.toISOString()}>
              <h3 className="mb-3 text-sm font-medium text-muted-foreground">
                {format(group.date, "EEEE, dd/MM/yyyy")}
              </h3>
              <div className="space-y-2">
                {group.slots.map((slot) => (
                  <Card
                    key={slot.id}
                    className="transition-colors hover:bg-muted/30"
                  >
                    <CardContent className="flex items-center justify-between p-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm font-medium">
                          <Clock className="size-3.5 text-muted-foreground" />
                          <span>{formatTime(slot.startTime)}</span>
                          <span className="text-muted-foreground">—</span>
                          <span>{formatTime(slot.endTime)}</span>
                        </div>
                        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1 font-medium text-foreground">
                            <DollarSign className="size-3" />
                            {formatPrice(slot.price)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="size-3" />
                            {slot.currentBookings}/{slot.maxBookings}
                          </span>
                          {slot.description && (
                            <span className="truncate max-w-[200px]">
                              {slot.description}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <Badge
                          variant={STATUS_VARIANT[slot.status] ?? "secondary"}
                          className="text-xs"
                        >
                          {SLOT_STATUS_LABEL[slot.status]}
                        </Badge>
                        {slot.status === SLOT_STATUS.Available && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="size-8"
                            onClick={() => setEditSlot(slot)}
                          >
                            <Edit className="size-3.5" />
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create slot dialog */}
      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create New Slot</DialogTitle>
          </DialogHeader>
          {mentorId && (
            <MentorSlotForm
              mentorId={mentorId}
              onSuccess={() => setCreateOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Edit slot dialog */}
      <Dialog open={!!editSlot} onOpenChange={(o) => !o && setEditSlot(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Slot</DialogTitle>
          </DialogHeader>
          {mentorId && editSlot && (
            <MentorSlotForm
              mentorId={mentorId}
              slot={editSlot}
              onSuccess={() => setEditSlot(null)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
