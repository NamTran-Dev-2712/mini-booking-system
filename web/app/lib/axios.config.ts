import axios, {
  AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
} from "axios";
import type { ApiError, ApiResponse } from "~/types/global/api.response";

// ---------------------------------------------------------------------------
// Base instance
// ---------------------------------------------------------------------------
const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Ensure baseURL is always correct (handles SSR hydration timing)
apiClient.interceptors.request.use((config) => {
  if (typeof window !== "undefined" && window.ENV?.VITE_API_URL) {
    config.baseURL = window.ENV.VITE_API_URL;
  }
  if (typeof window !== "undefined") {
    const lng = localStorage.getItem("i18nextLng") || "en";
    config.headers["Accept-Language"] = lng;
  }
  return config;
});

// ---------------------------------------------------------------------------
// Token refresh state
// Ensures only ONE refresh call is in-flight at a time.
// All concurrent 401 requests queue up and retry after the refresh resolves.
// ---------------------------------------------------------------------------
let isRefreshing = false;
let refreshQueue: Array<{
  resolve: () => void;
  reject: (err: unknown) => void;
}> = [];

function processQueue(error: unknown) {
  refreshQueue.forEach((p) => (error ? p.reject(error) : p.resolve()));
  refreshQueue = [];
}

// ---------------------------------------------------------------------------
// Response interceptor
// ---------------------------------------------------------------------------
apiClient.interceptors.response.use(
  // ── Success path ──────────────────────────────────────────────────────────
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

    return response;
  },

  // ── Error path ────────────────────────────────────────────────────────────
  async (axiosError: AxiosError<ApiResponse>) => {
    const originalRequest = axiosError.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    // Network / CORS / timeout — no response at all
    if (!axiosError.response) {
      const error: ApiError = {
        message: "Network error. Please check your connection.",
        errors: [],
        statusCode: 0,
      };
      return Promise.reject(error);
    }

    const status = axiosError.response.status;

    // ── 401 → attempt token refresh ────────────────────────────────────────
    // Skip refresh for the refresh endpoint itself to avoid infinite loops.
    const isRefreshEndpoint =
      originalRequest.url?.includes("/api/auth/refresh");
    const isLoginEndpoint = originalRequest.url?.includes("/api/auth/login");
    const isPublicAuthEndpoint =
      originalRequest.url?.includes("/api/auth/forgot-password") ||
      originalRequest.url?.includes("/api/auth/reset-password") ||
      originalRequest.url?.includes("/api/auth/avatar");

    if (
      status === 401 &&
      !originalRequest._retry &&
      !isRefreshEndpoint &&
      !isLoginEndpoint &&
      !isPublicAuthEndpoint
    ) {
      if (isRefreshing) {
        // Another refresh is already in-flight — queue this request
        return new Promise<AxiosResponse>((resolve, reject) => {
          refreshQueue.push({
            resolve: () => resolve(apiClient(originalRequest)),
            reject,
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Call refresh — BE reads the httpOnly refresh_token cookie automatically
        await apiClient.post("/api/auth/refresh");

        // Refresh succeeded — drain the queue and retry the original request
        processQueue(null);
        return apiClient(originalRequest);
      } catch (refreshError) {
        // Refresh failed (e.g. refresh token also expired)
        processQueue(refreshError);

        // Clear client-side auth state and redirect to login
        // Dynamic import avoids circular dependency with the store
        const { useAuthStore } = await import("~/stores/auth.store");
        useAuthStore.getState().clearUser();

        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }

        const error: ApiError = {
          message: "Session expired. Please log in again.",
          errors: [],
          statusCode: 401,
        };
        return Promise.reject(error);
      } finally {
        isRefreshing = false;
      }
    }

    // ── All other errors — normalize to ApiError ───────────────────────────
    const body = axiosError.response.data;
    const error: ApiError = {
      message: body?.message ?? axiosError.message,
      errors: body?.errors ?? [],
      statusCode: body?.statusCode ?? status,
      traceId: body?.traceId,
    };

    return Promise.reject(error);
  },
);

export default apiClient;
