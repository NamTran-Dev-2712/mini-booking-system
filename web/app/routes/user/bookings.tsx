import { CalendarCheck } from "lucide-react";

export function meta() {
  return [{ title: "My Bookings — MiniBooking" }];
}

export default function UserBookings() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">My Bookings</h2>
        <p className="text-muted-foreground">
          View and manage your mentoring sessions.
        </p>
      </div>

      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-16 text-center">
        <CalendarCheck className="mb-4 size-10 text-muted-foreground/50" />
        <p className="text-sm font-medium text-muted-foreground">
          No bookings yet
        </p>
        <p className="mt-1 text-xs text-muted-foreground/70">
          Book a session with a mentor to get started.
        </p>
      </div>
    </div>
  );
}
