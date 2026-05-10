import { Users } from "lucide-react";

export function meta() {
  return [{ title: "Find Mentors — MiniBooking" }];
}

export default function UserFindMentors() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Find Mentors</h2>
        <p className="text-muted-foreground">
          Browse and connect with expert mentors.
        </p>
      </div>

      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-16 text-center">
        <Users className="mb-4 size-10 text-muted-foreground/50" />
        <p className="text-sm font-medium text-muted-foreground">
          Mentor directory coming soon
        </p>
      </div>
    </div>
  );
}
