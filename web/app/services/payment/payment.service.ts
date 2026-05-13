import type { AxiosResponse } from "axios";
import apiClient from "~/lib/axios.config";
import type { ApiResponse } from "~/types/global/api.response";
import type {
  CreatePaymentResponse,
  PaymentStatusResponse,
} from "~/types/payment/payment";

export const paymentService = {
  async createPayment(bookingId: string): Promise<CreatePaymentResponse> {
    const res: AxiosResponse<ApiResponse<CreatePaymentResponse>> =
      await apiClient.post("/api/Payment", { bookingId });
    return res.data.data!;
  },

  async getPaymentStatus(bookingId: string): Promise<PaymentStatusResponse> {
    const res: AxiosResponse<ApiResponse<PaymentStatusResponse>> =
      await apiClient.get(`/api/Payment/${bookingId}/status`);
    return res.data.data!;
  },
};
