import { data, redirect } from "react-router";
import { useAuthStore } from "~/stores/auth.store";

const ROLE_REDIRECT: Record<string, string> = {
  Admin: "/admin",
  Mentor: "/mentor",
  User: "/user",
};

/**
 * clientLoader factory that enforces role-based access control.
 *
 * Usage in a layout route:
 *   export const clientLoader = requireRole("Admin");
 *
 * - Rehydrates the Zustand store from localStorage (SSR-safe).
 * - Redirects to /login if not authenticated.
 * - Throws a 404 if authenticated but missing the required role
 *   (hides the existence of role-restricted routes from other roles).
 */
export function requireRole(role: string) {
  return async function clientLoader() {
    await useAuthStore.persist.rehydrate();
    const { isAuthenticated, user } = useAuthStore.getState();

    if (!isAuthenticated) {
      throw redirect("/login");
    }

    // Wrong role: surface as 404 to avoid leaking that the route exists
    if (!user?.roles.includes(role)) {
      throw data(null, { status: 404 });
    }

    return null;
  };
}

/**
 * Redirects an already-authenticated user to their role's dashboard.
 * Used in public and auth layout loaders.
 */
export async function redirectIfAuthenticated() {
  await useAuthStore.persist.rehydrate();
  const { isAuthenticated, user } = useAuthStore.getState();

  if (isAuthenticated && user) {
    const primaryRole = user.roles[0] ?? "User";
    throw redirect(ROLE_REDIRECT[primaryRole] ?? "/");
  }

  return null;
}
