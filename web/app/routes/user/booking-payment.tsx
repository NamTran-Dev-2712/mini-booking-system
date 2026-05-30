import type { Route } from "./+types/booking-payment";
import BookingPaymentPage from "~/features/user/booking-payment/booking-payment.page";

export { meta } from "~/features/user/booking-payment/booking-payment.page";

export default function BookingPaymentRoute({ params }: Route.ComponentProps) {
  return <BookingPaymentPage bookingId={params.id} />;
}
