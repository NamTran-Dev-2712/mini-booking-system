import { Users } from "lucide-react";

export function meta() {
  return [{ title: "Mentors — Admin | MiniBooking" }];
}

export default function AdminMentors() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Mentors</h2>
        <p className="text-muted-foreground">
          Create and manage mentor accounts.
        </p>
      </div>

      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-16 text-center">
        <Users className="mb-4 size-10 text-muted-foreground/50" />
        <p className="text-sm font-medium text-muted-foreground">
          Mentor management coming soon
        </p>
      </div>
    </div>
  );
}
