import { CheckCircle2, Clock, Loader2, QrCode, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { useQueryClient } from "@tanstack/react-query";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Skeleton } from "~/components/ui/skeleton";
import { useBookingDetailQuery } from "~/hooks/booking/use-booking-detail-query";
import { useCreatePaymentMutation } from "~/hooks/payment/use-create-payment-mutation";
import { usePaymentStatusQuery } from "~/hooks/payment/use-payment-status-query";
import { queryKeys } from "~/lib/query-keys";
import {
  PaymentStatus,
  type CreatePaymentResponse,
} from "~/types/payment/payment";

export function meta() {
  return [{ title: "Payment — MiniBooking" }];
}

function formatPrice(price: number) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(price);
}

function CountdownTimer({ expiredAt }: { expiredAt: string }) {
  const [remaining, setRemaining] = useState(() =>
    Math.max(
      0,
      Math.floor((new Date(expiredAt).getTime() - Date.now()) / 1000),
    ),
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const diff = Math.max(
        0,
        Math.floor((new Date(expiredAt).getTime() - Date.now()) / 1000),
      );
      setRemaining(diff);
      if (diff <= 0) clearInterval(interval);
    }, 1000);
    return () => clearInterval(interval);
  }, [expiredAt]);

  const minutes = Math.floor(remaining / 60);
  const seconds = remaining % 60;

  if (remaining <= 0) {
    return <span className="font-medium text-destructive">Expired</span>;
  }

  return (
    <span
      className={
        remaining < 60 ? "font-medium text-destructive" : "font-medium"
      }
    >
      {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
    </span>
  );
}

function PaymentSuccess({ bookingId }: { bookingId: string }) {
  const { t } = useTranslation("payment");
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: queryKeys.bookings.detail(bookingId),
    });
    queryClient.invalidateQueries({ queryKey: queryKeys.bookings.lists() });

    const timer = setTimeout(() => {
      navigate(`/user/bookings/${bookingId}`);
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate, bookingId, queryClient]);

  return (
    <div className="flex flex-col items-center gap-4 py-8 text-center">
      <div className="flex size-16 items-center justify-center rounded-full bg-green-100">
        <CheckCircle2 className="size-8 text-green-600" />
      </div>
      <div className="space-y-1">
        <h3 className="text-lg font-semibold">{t("success.title")}</h3>
        <p className="text-sm text-muted-foreground">
          {t("success.description")}
        </p>
      </div>
    </div>
  );
}

function PaymentExpired({
  bookingId,
  mentorId,
}: {
  bookingId: string;
  mentorId?: string;
}) {
  const { t } = useTranslation("payment");
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center gap-4 py-8 text-center">
      <div className="flex size-16 items-center justify-center rounded-full bg-orange-100">
        <Clock className="size-8 text-orange-600" />
      </div>
      <div className="space-y-1">
        <h3 className="text-lg font-semibold">{t("expired.title")}</h3>
        <p className="text-sm text-muted-foreground">
          {t("expired.description")}
        </p>
      </div>
      <div className="flex gap-2">
        {mentorId && (
          <Button
            variant="outline"
            onClick={() => navigate(`/user/mentors/${mentorId}`)}
          >
            {t("expired.backToMentor")}
          </Button>
        )}
        <Button onClick={() => navigate("/user/bookings")}>
          {t("expired.myBookings")}
        </Button>
      </div>
    </div>
  );
}

function PaymentFailed({ reason }: { reason?: string | null }) {
  const { t } = useTranslation("payment");
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center gap-4 py-8 text-center">
      <div className="flex size-16 items-center justify-center rounded-full bg-red-100">
        <XCircle className="size-8 text-red-600" />
      </div>
      <div className="space-y-1">
        <h3 className="text-lg font-semibold">{t("failed.title")}</h3>
        <p className="text-sm text-muted-foreground">
          {reason || t("failed.defaultReason")}
        </p>
      </div>
      <Button onClick={() => navigate("/user/bookings")}>
        {t("failed.myBookings")}
      </Button>
    </div>
  );
}

function QrPaymentView({
  payment,
  bookingId,
}: {
  payment: CreatePaymentResponse;
  bookingId: string;
}) {
  const { t } = useTranslation("payment");
  const { data: status } = usePaymentStatusQuery(bookingId);
  const booking = useBookingDetailQuery(bookingId);
  const mentorId = booking.data?.mentor?.id;

  if (status?.status === PaymentStatus.Succeeded) {
    return <PaymentSuccess bookingId={bookingId} />;
  }

  if (status?.status === PaymentStatus.Expired) {
    return <PaymentExpired bookingId={bookingId} mentorId={mentorId} />;
  }

  if (status?.status === PaymentStatus.Failed) {
    return <PaymentFailed reason={status.failureReason} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center gap-4">
        <div className="rounded-xl border-2 border-dashed bg-white p-4">
          <img
            src={payment.qrCodeUrl}
            alt="Payment QR Code"
            className="size-56 sm:size-64"
          />
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="size-4 animate-spin" />
          <span>{t("qr.waitingForPayment")}</span>
        </div>
      </div>

      <div className="space-y-3 rounded-lg border bg-muted/50 p-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">{t("detail.amount")}</span>
          <span className="text-lg font-semibold">
            {formatPrice(payment.amount)}
          </span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">{t("detail.orderCode")}</span>
          <Badge variant="outline" className="font-mono text-xs">
            {payment.providerOrderCode}
          </Badge>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            {t("detail.timeRemaining")}
          </span>
          <CountdownTimer expiredAt={payment.expiredAt} />
        </div>
      </div>

      <div className="space-y-2 rounded-lg border p-4">
        <p className="text-sm font-medium">{t("qr.howToPay")}</p>
        <ol className="list-inside list-decimal space-y-1 text-sm text-muted-foreground">
          <li>{t("qr.step1")}</li>
          <li>{t("qr.step2")}</li>
          <li>{t("qr.step3")}</li>
          <li>{t("qr.step4")}</li>
        </ol>
      </div>
    </div>
  );
}

export default function BookingPaymentPage({
  bookingId,
}: {
  bookingId: string;
}) {
  const { t } = useTranslation("payment");
  const navigate = useNavigate();
  const createPayment = useCreatePaymentMutation();
  const [payment, setPayment] = useState<CreatePaymentResponse | null>(null);

  useEffect(() => {
    if (!bookingId) return;
    createPayment.mutate(bookingId, {
      onSuccess: (data) => setPayment(data),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookingId]);

  return (
    <div className="flex items-start justify-center py-6">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2">
            <QrCode className="size-5" />
            {t("page.title")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {createPayment.isPending && !payment && (
            <div className="flex flex-col items-center gap-4 py-8">
              <Skeleton className="size-56 rounded-xl" />
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-20 w-full" />
            </div>
          )}

          {createPayment.isError && !payment && (
            <div className="flex flex-col items-center gap-4 py-8 text-center">
              <XCircle className="size-10 text-destructive" />
              <p className="text-sm text-muted-foreground">
                {t("page.failedToCreate")}
              </p>
              <Button
                variant="outline"
                onClick={() => navigate("/user/bookings")}
              >
                {t("expired.myBookings")}
              </Button>
            </div>
          )}

          {payment && <QrPaymentView payment={payment} bookingId={bookingId} />}
        </CardContent>
      </Card>
    </div>
  );
}
