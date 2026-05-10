import { GraduationCap } from "lucide-react";

export function meta() {
  return [{ title: "My Skills — MiniBooking" }];
}

export default function MentorSkills() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">My Skills</h2>
        <p className="text-muted-foreground">
          Add and manage the skills you mentor in.
        </p>
      </div>

      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-16 text-center">
        <GraduationCap className="mb-4 size-10 text-muted-foreground/50" />
        <p className="text-sm font-medium text-muted-foreground">
          Skills management coming soon
        </p>
      </div>
    </div>
  );
}
