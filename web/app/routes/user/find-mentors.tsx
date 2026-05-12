import { MentorListContainer } from "~/components/shared/mentor/mentor-list-container";

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

      <MentorListContainer detailBasePath="/user/mentors" defaultPageSize={9} />
    </div>
  );
}
