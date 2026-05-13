import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "~/lib/query-keys";
import { bookingService } from "~/services/booking/booking.service";

export function useCreateBookingMutation() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (params: {
      userId: string;
      mentorSlotId: string;
      notes?: string;
      idempotencyKey?: string;
    }) => bookingService.createBooking(params),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.mentors.details() });
      qc.invalidateQueries({ queryKey: queryKeys.bookings.all() });
    },
  });
}
