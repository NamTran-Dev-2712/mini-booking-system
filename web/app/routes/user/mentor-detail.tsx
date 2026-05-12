import type { Route } from "./+types/mentor-detail";
import { MentorDetailView } from "~/components/shared/mentor/mentor-detail-view";

export function meta() {
  return [{ title: "Mentor Profile — MiniBooking" }];
}

export default function UserMentorDetail({ params }: Route.ComponentProps) {
  return (
    <div className="space-y-6">
      <MentorDetailView mentorId={params.id} context="user" />
    </div>
  );
}
