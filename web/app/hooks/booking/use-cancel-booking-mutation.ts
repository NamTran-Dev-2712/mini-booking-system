import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "~/lib/query-keys";
import { bookingService } from "~/services/booking/booking.service";

export function useCancelBookingMutation() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (params: {
      userId: string;
      bookingId: string;
      cancellationReason?: string;
    }) => bookingService.cancelBooking(params),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.bookings.all() });
      qc.invalidateQueries({ queryKey: queryKeys.mentors.details() });
    },
  });
}
