import type { Route } from "./+types/booking-detail";
import BookingDetailPage from "~/features/user/booking-detail/booking-detail.page";

export { meta } from "~/features/user/booking-detail/booking-detail.page";

export default function BookingDetailRoute({ params }: Route.ComponentProps) {
  return <BookingDetailPage bookingId={params.id} />;
}
