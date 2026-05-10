import axios, { AxiosError, type AxiosResponse } from "axios";
import type { ApiError, ApiResponse } from "~/types/global/api.response";

// ---------------------------------------------------------------------------
// Base instance
// ---------------------------------------------------------------------------
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // send/receive httpOnly auth cookies
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// ---------------------------------------------------------------------------
// Response interceptor
// Unwraps ApiResponse<T> → returns T directly, or throws ApiError
// ---------------------------------------------------------------------------
apiClient.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>) => {
    const body = response.data;

    // BE returns success: false with a 2xx status in some edge cases
    if (!body.success) {
      const error: ApiError = {
        message: body.message,
        errors: body.errors ?? [],
        statusCode: body.statusCode,
        traceId: body.traceId,
      };
      return Promise.reject(error);
    }

    // Return the raw response so callers can access .data, .message, etc.
    return response;
  },
  (axiosError: AxiosError<ApiResponse>) => {
    // Network / CORS / timeout errors
    if (!axiosError.response) {
      const error: ApiError = {
        message: "Network error. Please check your connection.",
        errors: [],
        statusCode: 0,
      };
      return Promise.reject(error);
    }

    const body = axiosError.response.data;

    // Normalize BE error envelope into ApiError
    const error: ApiError = {
      message: body?.message ?? axiosError.message,
      errors: body?.errors ?? [],
      statusCode: body?.statusCode ?? axiosError.response.status,
      traceId: body?.traceId,
    };

    return Promise.reject(error);
  },
);

export default apiClient;
