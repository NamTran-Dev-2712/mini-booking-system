import type { Route } from "./+types/mentors.$id";
import { MentorDetailPage } from "~/features/admin/mentor/mentor-detail-page";

export function meta({ params }: Route.MetaArgs) {
  return [{ title: `Mentor Detail — Admin | MiniBooking` }];
}

export default function AdminMentorDetail({ params }: Route.ComponentProps) {
  return <MentorDetailPage mentorId={params.id} />;
}
