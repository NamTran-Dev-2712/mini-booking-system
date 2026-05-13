import {
  CalendarCheck,
  ChevronRight,
  Clock,
  CreditCard,
  DollarSign,
  User,
} from "lucide-react";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { Skeleton } from "~/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { DataTablePagination } from "~/components/shared/data-table/data-table-pagination";
import { useUserBookingsQuery } from "~/hooks/booking/use-user-bookings-query";
import { useAuthStore } from "~/stores/auth.store";
import {
  BookingStatus,
  BOOKING_STATUS_LABEL,
  type Booking,
  type BookingStatusValue,
} from "~/types/booking/booking";

export function meta() {
  return [{ title: "My Bookings — MiniBooking" }];
}

const STATUS_TABS: {
  label: string;
  value: string;
  filter?: BookingStatusValue;
}[] = [
  { label: "All", value: "all" },
  { label: "Pending", value: "pending", filter: BookingStatus.PendingPayment },
  { label: "Confirmed", value: "confirmed", filter: BookingStatus.Confirmed },
  { label: "Completed", value: "completed", filter: BookingStatus.Completed },
  { label: "Cancelled", value: "cancelled", filter: BookingStatus.Cancelled },
  { label: "Expired", value: "expired", filter: BookingStatus.Expired },
];

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

function BookingCardSkeleton() {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          <Skeleton className="size-12 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-3 w-56" />
            <Skeleton className="h-3 w-24" />
          </div>
          <Skeleton className="h-6 w-20" />
        </div>
      </CardContent>
    </Card>
  );
}

function BookingCard({
  booking,
  onClick,
}: {
  booking: Booking;
  onClick: () => void;
}) {
  const navigate = useNavigate();
  const initials =
    (booking.mentor.displayName ?? "")
      .split(" ")
      .filter(Boolean)
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "?";

  const isPending = booking.status === BookingStatus.PendingPayment;

  return (
    <Card
      className="cursor-pointer transition-all hover:shadow-md hover:-translate-y-0.5"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          <Avatar className="size-12 shrink-0">
            <AvatarImage
              src={booking.mentor.avatarUrl ?? undefined}
              alt={booking.mentor.displayName}
            />
            <AvatarFallback className="text-sm font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>

          <div className="min-w-0 flex-1 space-y-1">
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium truncate">
                {booking.mentor.displayName}
              </p>
              <Badge
                variant={STATUS_VARIANT[booking.status] ?? "secondary"}
                className="text-xs shrink-0"
              >
                {BOOKING_STATUS_LABEL[booking.status] ?? "Unknown"}
              </Badge>
            </div>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Clock className="size-3" />
                {formatSlotTime(booking.mentorSlot.startTime)}
              </span>
              <span className="flex items-center gap-1">
                <DollarSign className="size-3" />
                {formatPrice(booking.mentorSlot.price)}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              Code: {booking.bookingCode}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {isPending && (
              <Button
                size="sm"
                variant="default"
                className="gap-1.5"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/user/bookings/${booking.id}/payment`);
                }}
              >
                <CreditCard className="size-3.5" />
                Pay
              </Button>
            )}
            <ChevronRight className="size-4 text-muted-foreground" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function UserBookings() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const user = useAuthStore((s) => s.user);

  const activeTab = searchParams.get("status") ?? "all";
  const page = Number(searchParams.get("page") ?? "1");

  const statusFilter = STATUS_TABS.find((t) => t.value === activeTab)?.filter;

  const { data, isPending } = useUserBookingsQuery(user?.userId ?? "", {
    pageNumber: page,
    pageSize: 10,
    status: statusFilter,
    sortBy: "CreatedAt",
    sortOrder: "desc",
  });

  const bookings = data?.items ?? [];

  function handleTabChange(value: string) {
    const params = new URLSearchParams();
    if (value !== "all") params.set("status", value);
    setSearchParams(params, { replace: true });
  }

  function handlePageChange(p: number) {
    const params = new URLSearchParams(searchParams);
    if (p > 1) params.set("page", String(p));
    else params.delete("page");
    setSearchParams(params, { replace: true });
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">My Bookings</h2>
        <p className="text-muted-foreground">
          View and manage your mentoring sessions.
        </p>
      </div>

      {/* Status filter tabs */}
      <Tabs value={activeTab} onValueChange={handleTabChange}>
        <TabsList className="w-full justify-start overflow-x-auto">
          {STATUS_TABS.map((tab) => (
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

      {/* Booking list */}
      {isPending ? (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <BookingCardSkeleton key={i} />
          ))}
        </div>
      ) : bookings.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-16 text-center">
          <CalendarCheck className="mb-4 size-10 text-muted-foreground/50" />
          <p className="text-sm font-medium text-muted-foreground">
            No bookings found
          </p>
          <p className="mt-1 text-xs text-muted-foreground/70">
            {activeTab === "all"
              ? "Book a session with a mentor to get started."
              : "No bookings with this status."}
          </p>
          <Button
            variant="outline"
            size="sm"
            className="mt-4"
            onClick={() => navigate("/user/mentors")}
          >
            Find Mentors
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {bookings.map((booking) => (
            <BookingCard
              key={booking.id}
              booking={booking}
              onClick={() => navigate(`/user/bookings/${booking.id}`)}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      {data && data.totalPages > 1 && (
        <DataTablePagination
          pageNumber={data.pageNumber}
          pageSize={data.pageSize}
          totalPages={data.totalPages}
          totalCount={data.totalCount}
          hasPreviousPage={data.hasPreviousPage}
          hasNextPage={data.hasNextPage}
          onPageChange={handlePageChange}
          onPageSizeChange={() => {}}
        />
      )}
    </div>
  );
}
