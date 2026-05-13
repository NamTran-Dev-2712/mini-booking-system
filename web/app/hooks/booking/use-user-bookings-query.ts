import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { queryKeys } from "~/lib/query-keys";
import { bookingService } from "~/services/booking/booking.service";
import type { GetUserBookingsRequest } from "~/types/booking/booking";

export function useUserBookingsQuery(
  userId: string,
  filters: GetUserBookingsRequest = {},
) {
  return useQuery({
    queryKey: queryKeys.bookings.list({ ...filters }),
    queryFn: () => bookingService.getUserBookings(userId, filters),
    placeholderData: keepPreviousData,
    enabled: !!userId,
  });
}
