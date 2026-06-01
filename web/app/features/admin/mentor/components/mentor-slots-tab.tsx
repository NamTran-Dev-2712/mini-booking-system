import { format, isSameDay } from "date-fns";
import { CalendarDays, Clock, MapPin, Plus } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { Kbd } from "~/components/ui/kbd";
import { Separator } from "~/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import type { MentorSlot } from "~/types/mentor/mentor";
import { SLOT_STATUS_LABEL } from "~/types/mentor/mentor";
import { MentorSlotForm } from "./mentor-slot-form";

const STATUS_VARIANT: Record<
  number,
  "default" | "secondary" | "destructive" | "outline"
> = {
  1: "default",
  2: "secondary",
  3: "outline",
  4: "destructive",
  5: "outline",
};

interface MentorSlotsTabProps {
  mentorId: string;
  slots: MentorSlot[];
  /** Hotkey shortcut to open create dialog */
  createShortcutEnabled?: boolean;
}

export function MentorSlotsTab({
  mentorId,
  slots,
  createShortcutEnabled = false,
}: MentorSlotsTabProps) {
  const { t } = useTranslation("mentor");
  const [createOpen, setCreateOpen] = useState(false);
  const [editSlot, setEditSlot] = useState<MentorSlot | null>(null);

  const sorted = [...slots].sort(
    (a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime(),
  );

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
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">
          {t("slots.title")}
          <span className="ml-2 text-xs text-muted-foreground">
            ({slots.length})
          </span>
        </h3>
        <Button
          size="sm"
          onClick={() => setCreateOpen(true)}
          className="gap-1.5"
        >
          <Plus className="size-4" />
          {t("slots.newSlot")}
          {createShortcutEnabled && <Kbd>C</Kbd>}
        </Button>
      </div>

      {/* Slot groups */}
      {groups.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-10 text-center">
          <CalendarDays className="mb-3 size-8 text-muted-foreground/50" />
          <p className="text-sm text-muted-foreground">
            {t("slots.noSlotsYet")}
          </p>
          <Button
            variant="outline"
            size="sm"
            className="mt-3"
            onClick={() => setCreateOpen(true)}
          >
            {t("slots.createFirstSlot")}
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {groups.map(({ date, slots: daySlots }) => (
            <div key={date.toISOString()}>
              <div className="mb-3 flex items-center gap-2">
                <CalendarDays className="size-4 text-muted-foreground" />
                <span className="text-sm font-medium">
                  {format(date, "EEEE, dd MMMM yyyy")}
                </span>
              </div>

              <div className="space-y-2">
                {daySlots.map((slot) => (
                  <Card
                    key={slot.id}
                    className="cursor-pointer transition-colors hover:bg-accent/50"
                    onClick={() => setEditSlot(slot)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <Clock className="size-4 shrink-0 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-semibold">{slot.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {format(new Date(slot.startTime), "HH:mm")} —{" "}
                              {format(new Date(slot.endTime), "HH:mm")}
                              {" · "}
                              {Math.round(
                                (new Date(slot.endTime).getTime() -
                                  new Date(slot.startTime).getTime()) /
                                  60_000,
                              )}{" "}
                              {t("slots.min")}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-col items-end gap-1.5">
                          <Badge
                            variant={STATUS_VARIANT[slot.status]}
                            className="text-xs"
                          >
                            {SLOT_STATUS_LABEL[slot.status] ?? "Unknown"}
                          </Badge>
                          <span className="text-xs font-medium">
                            {new Intl.NumberFormat("vi-VN", {
                              style: "currency",
                              currency: "VND",
                              maximumFractionDigits: 0,
                            }).format(slot.price)}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {slot.currentBookings}/{slot.maxBookings}{" "}
                            {t("slots.booked")}
                          </span>
                        </div>
                      </div>

                      {slot.location && (
                        <div className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                          <MapPin className="size-3.5 shrink-0" />
                          <span className="truncate">{slot.location}</span>
                        </div>
                      )}

                      {slot.description && (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <p className="mt-2 truncate text-xs text-muted-foreground">
                              {slot.description}
                            </p>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-xs text-xs">
                              {slot.description}
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Separator className="mt-4" />
            </div>
          ))}
        </div>
      )}

      {/* Create slot dialog */}
      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{t("slots.createSlot")}</DialogTitle>
          </DialogHeader>
          <MentorSlotForm
            mentorId={mentorId}
            onSuccess={() => setCreateOpen(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Edit slot dialog */}
      <Dialog open={!!editSlot} onOpenChange={(o) => !o && setEditSlot(null)}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{t("slots.editSlot")}</DialogTitle>
          </DialogHeader>
          {editSlot && (
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
