import type { AxiosResponse } from "axios";
import apiClient from "~/lib/axios.config";
import type { ApiResponse } from "~/types/global/api.response";
import type { PaginatedResult } from "~/types/global/paginated";
import type { Booking, GetUserBookingsRequest } from "~/types/booking/booking";

export const bookingService = {
  async createBooking(params: {
    userId: string;
    mentorSlotId: string;
    notes?: string;
    idempotencyKey?: string;
  }): Promise<string> {
    const res: AxiosResponse<ApiResponse<string>> = await apiClient.post(
      "/api/Booking",
      {
        userId: params.userId,
        mentorSlotId: params.mentorSlotId,
        notes: params.notes,
      },
      {
        headers: params.idempotencyKey
          ? { "Idempotency-Key": params.idempotencyKey }
          : undefined,
      },
    );
    return res.data.data!;
  },

  async getUserBookings(
    userId: string,
    params: GetUserBookingsRequest = {},
  ): Promise<PaginatedResult<Booking>> {
    const res: AxiosResponse<ApiResponse<PaginatedResult<Booking>>> =
      await apiClient.get(`/api/Booking/${userId}`, { params });
    return res.data.data!;
  },

  async getBookingDetail(bookingId: string): Promise<Booking> {
    const res: AxiosResponse<ApiResponse<Booking>> = await apiClient.get(
      `/api/Booking/${bookingId}/detail`,
    );
    return res.data.data!;
  },

  async cancelBooking(params: {
    userId: string;
    bookingId: string;
    cancellationReason?: string;
  }): Promise<string> {
    const res: AxiosResponse<ApiResponse<string>> = await apiClient.post(
      "/api/Booking/cancel",
      params,
    );
    return res.data.data!;
  },
};
