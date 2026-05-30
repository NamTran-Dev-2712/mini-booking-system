import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Clock,
  CreditCard,
  DollarSign,
  Loader2,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { Label } from "~/components/ui/label";
import { Separator } from "~/components/ui/separator";
import { Skeleton } from "~/components/ui/skeleton";
import { Textarea } from "~/components/ui/textarea";
import { useBookingDetailQuery } from "~/hooks/booking/use-booking-detail-query";
import { useCancelBookingMutation } from "~/hooks/booking/use-cancel-booking-mutation";
import { useAuthStore } from "~/stores/auth.store";
import { getApiErrorMessage } from "~/lib/api-error";
import {
  BookingStatus,
  BOOKING_STATUS_LABEL,
  type BookingStatusValue,
} from "~/types/booking/booking";

export function meta() {
  return [{ title: "Booking Detail — MiniBooking" }];
}

const STATUS_VARIANT: Record<
  BookingStatusValue,
  "default" | "secondary" | "destructive" | "outline"
> = {
  [BookingStatus.PendingPayment]: "outline",
  [BookingStatus.Confirmed]: "default",
  [BookingStatus.Completed]: "secondary",
  [BookingStatus.Cancelled]: "destructive",
  [BookingStatus.Expired]: "secondary",
};

function formatDateTime(iso: string) {
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

function CancelDialog({
  open,
  onOpenChange,
  bookingId,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  bookingId: string;
}) {
  const { t } = useTranslation("booking");
  const [reason, setReason] = useState("");
  const user = useAuthStore((s) => s.user);
  const cancelBooking = useCancelBookingMutation();

  function handleCancel() {
    if (!user) return;
    cancelBooking.mutate(
      {
        userId: user.userId,
        bookingId,
        cancellationReason: reason.trim() || undefined,
      },
      {
        onSuccess: () => {
          toast.success(t("cancel.success"));
          onOpenChange(false);
        },
        onError: (error) => {
          toast.error(getApiErrorMessage(error));
        },
      },
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t("cancel.title")}</DialogTitle>
          <DialogDescription>{t("actions.cancelConfirm")}</DialogDescription>
        </DialogHeader>
        <div className="space-y-2 py-2">
          <Label htmlFor="cancel-reason" className="text-sm">
            {t("actions.cancelReason")}
          </Label>
          <Textarea
            id="cancel-reason"
            placeholder={t("actions.cancelReasonPlaceholder")}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            rows={3}
            className="resize-none"
          />
        </div>
        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={cancelBooking.isPending}
          >
            {t("actions.keepBooking")}
          </Button>
          <Button
            variant="destructive"
            onClick={handleCancel}
            disabled={cancelBooking.isPending}
          >
            {cancelBooking.isPending && (
              <Loader2 className="size-4 animate-spin" />
            )}
            {t("actions.cancel")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function TimelineItem({
  icon,
  label,
  time,
}: {
  icon: React.ReactNode;
  label: string;
  time: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border bg-background">
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium">{label}</p>
        <p className="text-xs text-muted-foreground">{formatDateTime(time)}</p>
      </div>
    </div>
  );
}

export default function BookingDetailPage({
  bookingId,
}: {
  bookingId: string;
}) {
  const { t } = useTranslation("booking");
  const navigate = useNavigate();
  const {
    data: booking,
    isPending,
    isError,
  } = useBookingDetailQuery(bookingId);
  const [cancelOpen, setCancelOpen] = useState(false);

  if (isPending) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-48 w-full" />
        <Skeleton className="h-32 w-full" />
      </div>
    );
  }

  if (isError || !booking) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <XCircle className="mb-4 size-10 text-muted-foreground/50" />
        <p className="text-sm font-medium text-muted-foreground">
          {t("detail.notFound")}
        </p>
        <Button
          variant="outline"
          size="sm"
          className="mt-4"
          onClick={() => navigate("/user/bookings")}
        >
          {t("actions.backToBookings")}
        </Button>
      </div>
    );
  }

  const initials =
    (booking.mentor.displayName ?? "")
      .split(" ")
      .filter(Boolean)
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "?";

  const isPending_ = booking.status === BookingStatus.PendingPayment;

  return (
    <div className="space-y-6">
      <Button
        variant="ghost"
        size="sm"
        className="gap-1.5 text-muted-foreground hover:text-foreground"
        onClick={() => navigate("/user/bookings")}
      >
        <ArrowLeft className="size-4" />
        {t("actions.backToBookings")}
      </Button>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-semibold">{t("detail.title")}</h2>
            <Badge
              variant={STATUS_VARIANT[booking.status] ?? "secondary"}
              className="text-xs"
            >
              {BOOKING_STATUS_LABEL[booking.status] ?? "Unknown"}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            Code: <span className="font-mono">{booking.bookingCode}</span>
          </p>
        </div>

        <div className="flex items-center gap-2">
          {isPending_ && (
            <>
              <Button
                size="sm"
                onClick={() => navigate(`/user/bookings/${bookingId}/payment`)}
                className="gap-1.5"
              >
                <CreditCard className="size-4" />
                {t("actions.pay")}
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => setCancelOpen(true)}
              >
                {t("actions.cancel")}
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">{t("detail.mentor")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <Avatar className="size-14 shrink-0">
                <AvatarImage
                  src={booking.mentor.avatarUrl ?? undefined}
                  alt={booking.mentor.displayName}
                />
                <AvatarFallback className="text-sm font-semibold">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <p className="font-medium">{booking.mentor.displayName}</p>
                {booking.mentor.specialization && (
                  <p className="text-sm text-muted-foreground">
                    {booking.mentor.specialization}
                  </p>
                )}
                <p className="text-xs text-muted-foreground">
                  {booking.mentor.email}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">
              {t("detail.sessionDetails")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <Calendar className="size-4 text-muted-foreground" />
              <div>
                <p className="font-semibold">{booking.mentorSlot.name}</p>
                <p className="font-medium">
                  {formatDateTime(booking.mentorSlot.startTime)}
                </p>
                <p className="text-muted-foreground">
                  {t("detail.to")} {formatDateTime(booking.mentorSlot.endTime)}
                </p>
              </div>
            </div>
            <Separator />
            <div className="flex items-center gap-3 text-sm">
              <DollarSign className="size-4 text-muted-foreground" />
              <span className="font-medium">
                {formatPrice(booking.mentorSlot.price)}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">{t("detail.timeline")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <TimelineItem
              icon={<Clock className="size-3.5" />}
              label={t("detail.bookingCreated")}
              time={booking.createdAt}
            />
            {booking.status === BookingStatus.Confirmed && (
              <TimelineItem
                icon={<CheckCircle2 className="size-3.5 text-green-600" />}
                label={t("detail.paymentConfirmed")}
                time={booking.updatedAt ?? booking.createdAt}
              />
            )}
            {booking.status === BookingStatus.Cancelled && (
              <TimelineItem
                icon={<XCircle className="size-3.5 text-destructive" />}
                label={`${t("detail.cancelled")}${booking.cancellationReason ? `: ${booking.cancellationReason}` : ""}`}
                time={booking.updatedAt ?? booking.createdAt}
              />
            )}
            {booking.status === BookingStatus.Expired && (
              <TimelineItem
                icon={<Clock className="size-3.5 text-orange-500" />}
                label={t("detail.bookingExpired")}
                time={booking.updatedAt ?? booking.createdAt}
              />
            )}
            {booking.status === BookingStatus.Completed && (
              <TimelineItem
                icon={<CheckCircle2 className="size-3.5 text-green-600" />}
                label={t("detail.sessionCompleted")}
                time={booking.updatedAt ?? booking.createdAt}
              />
            )}
          </div>
        </CardContent>
      </Card>

      <CancelDialog
        open={cancelOpen}
        onOpenChange={setCancelOpen}
        bookingId={bookingId}
      />
    </div>
  );
}
