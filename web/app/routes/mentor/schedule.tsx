import { CalendarDays } from "lucide-react";

export function meta() {
  return [{ title: "My Schedule — MiniBooking" }];
}

export default function MentorSchedule() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">My Schedule</h2>
        <p className="text-muted-foreground">
          Manage your available time slots.
        </p>
      </div>

      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-16 text-center">
        <CalendarDays className="mb-4 size-10 text-muted-foreground/50" />
        <p className="text-sm font-medium text-muted-foreground">
          Schedule management coming soon
        </p>
      </div>
    </div>
  );
}
