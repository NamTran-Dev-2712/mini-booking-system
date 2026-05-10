/**
 * Maps exactly to BE's ApiResponse<T> contract:
 * { success, message, data, errors, statusCode, traceId, timestamp }
 */
export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data: T | null;
  errors: string[] | null;
  statusCode: number;
  traceId: string;
  timestamp: string;
}

/**
 * Thrown by the axios interceptor when BE returns success: false
 * or when an HTTP error occurs.
 */
export interface ApiError {
  message: string;
  errors: string[];
  statusCode: number;
  traceId?: string;
}
