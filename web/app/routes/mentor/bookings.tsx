import { BookOpen } from "lucide-react";

export function meta() {
  return [{ title: "Bookings — MiniBooking" }];
}

export default function MentorBookings() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Bookings</h2>
        <p className="text-muted-foreground">
          View all sessions booked with you.
        </p>
      </div>

      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-16 text-center">
        <BookOpen className="mb-4 size-10 text-muted-foreground/50" />
        <p className="text-sm font-medium text-muted-foreground">
          No bookings yet
        </p>
      </div>
    </div>
  );
}
