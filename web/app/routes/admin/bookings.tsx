import { CalendarCheck } from "lucide-react";

export function meta() {
  return [{ title: "Bookings — Admin | MiniBooking" }];
}

export default function AdminBookings() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Bookings</h2>
        <p className="text-muted-foreground">
          View and manage all bookings across the platform.
        </p>
      </div>

      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-16 text-center">
        <CalendarCheck className="mb-4 size-10 text-muted-foreground/50" />
        <p className="text-sm font-medium text-muted-foreground">
          Booking management coming soon
        </p>
      </div>
    </div>
  );
}
