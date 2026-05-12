import type { Route } from "./+types/mentor-detail";
import { MentorDetailView } from "~/components/shared/mentor/mentor-detail-view";

export function meta() {
  return [{ title: "Mentor Profile — MiniBooking" }];
}

export default function PublicMentorDetail({ params }: Route.ComponentProps) {
  return (
    <div className="container mx-auto px-4 py-10">
      <MentorDetailView mentorId={params.id} context="public" />
    </div>
  );
}
