import { useAuthStore } from "~/stores/auth.store";

/** Returns the currently authenticated user, or null. */
export function useCurrentUser() {
  return useAuthStore((state) => state.user);
}

/** Returns true if the user is authenticated. */
export function useIsAuthenticated() {
  return useAuthStore((state) => state.isAuthenticated);
}

/** Returns true if the authenticated user has the given role. */
export function useHasRole(role: string) {
  return useAuthStore((state) => state.user?.roles.includes(role) ?? false);
}

/** Returns the user's primary role (first in the roles array), or null. */
export function usePrimaryRole() {
  return useAuthStore((state) => state.user?.roles[0] ?? null);
}
