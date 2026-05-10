import { redirect } from "react-router";
import { useAuthStore } from "~/stores/auth.store";

/**
 * clientLoader that enforces authentication (any role).
 *
 * Usage:
 *   export const clientLoader = requireAuth;
 *
 * - Rehydrates the Zustand store from localStorage (SSR-safe).
 * - Redirects to /login if not authenticated.
 */
export async function requireAuth() {
  await useAuthStore.persist.rehydrate();
  const { isAuthenticated } = useAuthStore.getState();

  if (!isAuthenticated) {
    throw redirect("/login");
  }

  return null;
}
