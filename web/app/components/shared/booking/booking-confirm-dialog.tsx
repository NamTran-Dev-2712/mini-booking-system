import { CalendarDays, Clock, DollarSign, Loader2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import { useCreateBookingMutation } from "~/hooks/booking/use-create-booking-mutation";
import { useUserBookingsQuery } from "~/hooks/booking/use-user-bookings-query";
import { useAuthStore } from "~/stores/auth.store";
import { getApiErrorMessage } from "~/lib/api-error";
import type { ApiError } from "~/types/global/api.response";
import type { MentorSlot } from "~/types/mentor/mentor";

interface BookingConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  slot: MentorSlot;
  mentorName: string;
}

function formatSlotTime(iso: string) {
  return new Date(iso).toLocaleString("vi-VN", {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
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

export function BookingConfirmDialog({
  open,
  onOpenChange,
  slot,
  mentorName,
}: BookingConfirmDialogProps) {
  const navigate = useNavigate();
  const [notes, setNotes] = useState("");
  const user = useAuthStore((s) => s.user);
  const createBooking = useCreateBookingMutation();

  function handleConfirm() {
    if (!user) {
      toast.error("Please sign in to book a session.");
      return;
    }

    const idempotencyKey = `${user.userId}:${slot.id}`;

    createBooking.mutate(
      {
        userId: user.userId,
        mentorSlotId: slot.id,
        notes: notes.trim() || undefined,
        idempotencyKey,
      },
      {
        onSuccess: (bookingId) => {
          toast.success("Booking created! Redirecting to payment...");
          onOpenChange(false);
          setNotes("");
          navigate(`/user/bookings/${bookingId}/payment`);
        },
        onError: (error) => {
          const apiError = error as unknown as ApiError;
          const isConflict =
            apiError?.statusCode === 409 ||
            apiError?.message
              ?.toLowerCase()
              .includes("already have an active booking");

          if (isConflict) {
            toast.info(
              "You already have a pending booking for this slot. Redirecting to payment...",
            );
            onOpenChange(false);
            navigate("/user/bookings?status=pending");
          } else {
            toast.error(getApiErrorMessage(error));
          }
        },
      },
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Confirm Booking</DialogTitle>
          <DialogDescription>
            You are about to book a session with {mentorName}.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="rounded-lg border bg-muted/50 p-4 space-y-3">
            <div className="flex items-center gap-2 text-sm">
              <CalendarDays className="size-4 text-muted-foreground" />
              <span className="font-medium">{slot.name}</span>
            </div>
            <div className="pl-6 space-y-1 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Clock className="size-3.5" />
                <span>{formatSlotTime(slot.startTime)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="size-3.5" />
                <span>{formatSlotTime(slot.endTime)}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 pl-6 text-sm font-medium">
              <DollarSign className="size-3.5 text-muted-foreground" />
              <span>{formatPrice(slot.price)}</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="booking-notes" className="text-sm">
              Notes (optional)
            </Label>
            <Textarea
              id="booking-notes"
              placeholder="Any specific topics or questions you'd like to discuss..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="resize-none"
            />
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={createBooking.isPending}
          >
            Cancel
          </Button>
          <Button onClick={handleConfirm} disabled={createBooking.isPending}>
            {createBooking.isPending && (
              <Loader2 className="size-4 animate-spin" />
            )}
            Confirm Booking
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
