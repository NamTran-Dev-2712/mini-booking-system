import type { ApiError } from "~/types/global/api.response";

/**
 * Extracts a user-facing error message from an unknown thrown value.
 * Works for both our ApiError shape and generic JS errors.
 */
export function getApiErrorMessage(error: unknown): string {
  if (isApiError(error)) {
    // Prefer the first specific error if available, else fall back to top-level message
    if (error.errors && error.errors.length > 0) {
      return error.errors[0];
    }
    return error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "An unexpected error occurred. Please try again.";
}

/**
 * Returns all error messages as an array (useful for form-level error lists).
 */
export function getApiErrors(error: unknown): string[] {
  if (isApiError(error)) {
    if (error.errors && error.errors.length > 0) {
      return error.errors;
    }
    return [error.message];
  }

  if (error instanceof Error) {
    return [error.message];
  }

  return ["An unexpected error occurred. Please try again."];
}

export function isApiError(error: unknown): error is ApiError {
  return (
    typeof error === "object" &&
    error !== null &&
    "statusCode" in error &&
    "message" in error
  );
}
