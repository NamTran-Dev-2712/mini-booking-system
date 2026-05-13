import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "~/lib/query-keys";
import { paymentService } from "~/services/payment/payment.service";
import { PaymentStatus } from "~/types/payment/payment";

export function usePaymentStatusQuery(
  bookingId: string,
  options?: { enabled?: boolean },
) {
  return useQuery({
    queryKey: queryKeys.payments.status(bookingId),
    queryFn: () => paymentService.getPaymentStatus(bookingId),
    enabled: options?.enabled !== false && !!bookingId,
    staleTime: 0,
    gcTime: 0,
    refetchInterval: (query) => {
      const data = query.state.data;
      if (!data) return 3000;
      if (data.status === PaymentStatus.Pending) return 3000;
      return false;
    },
    refetchIntervalInBackground: true,
  });
}
