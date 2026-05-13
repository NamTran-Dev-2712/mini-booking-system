import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "~/lib/query-keys";
import { bookingService } from "~/services/booking/booking.service";

export function useBookingDetailQuery(bookingId: string) {
  return useQuery({
    queryKey: queryKeys.bookings.detail(bookingId),
    queryFn: () => bookingService.getBookingDetail(bookingId),
    staleTime: 60_000,
    enabled: !!bookingId,
  });
}
