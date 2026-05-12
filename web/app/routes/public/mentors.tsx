import { MentorListContainer } from "~/components/shared/mentor/mentor-list-container";

export function meta() {
  return [
    { title: "Find Mentors — MiniBooking" },
    {
      name: "description",
      content:
        "Browse and connect with expert mentors. Filter by specialization, experience, and price.",
    },
  ];
}

export default function PublicMentors() {
  return (
    <div className="container mx-auto px-4 py-10 space-y-8">
      {/* Page header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Find a Mentor</h1>
        <p className="text-muted-foreground text-lg">
          Browse our expert mentors and book a session that fits your goals.
        </p>
      </div>

      {/* Mentor listing with filter + pagination */}
      <MentorListContainer detailBasePath="/mentors" defaultPageSize={9} />
    </div>
  );
}
