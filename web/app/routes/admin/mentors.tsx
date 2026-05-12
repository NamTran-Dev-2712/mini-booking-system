import { MentorListPage } from "~/features/admin/mentor/mentor-list-page";

export function meta() {
  return [{ title: "Mentors — Admin | MiniBooking" }];
}

export default function AdminMentors() {
  return <MentorListPage />;
}
