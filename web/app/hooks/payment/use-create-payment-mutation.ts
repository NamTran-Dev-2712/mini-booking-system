import { useMutation } from "@tanstack/react-query";
import { paymentService } from "~/services/payment/payment.service";

export function useCreatePaymentMutation() {
  return useMutation({
    mutationFn: (bookingId: string) => paymentService.createPayment(bookingId),
  });
}
