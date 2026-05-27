import { redirect } from "react-router";
import { authService } from "~/services/auth/auth.service";
import { useAuthStore } from "~/stores/auth.store";

const ROLE_REDIRECT: Record<string, string> = {
  Admin: "/admin",
  Mentor: "/mentor",
  User: "/user",
};

export function meta() {
  return [{ title: "Signing in… — MiniBooking" }];
}

// Runs only on the client (after Google OAuth redirect lands here).
// Fetches the user profile using the cookies that the API just set,
// populates the Zustand store, then redirects to the role dashboard.
export async function clientLoader() {
  try {
    const profile = await authService.getProfile();
    useAuthStore.getState().setUser({
      userId: profile.id.toString(),
      fullName: profile.fullName,
      email: profile.email,
      phoneNumber: profile.phoneNumber,
      roles: profile.roles,
      expiresIn: "",
      createdAt: profile.createdAt,
    });
    const primaryRole = profile.roles[0] ?? "User";
    throw redirect(ROLE_REDIRECT[primaryRole] ?? "/user");
  } catch (err) {
    // redirect() throws, so re-throw it; anything else sends to login
    if (err instanceof Response) throw err;
    throw redirect("/login");
  }
}

export function HydrateFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
    </div>
  );
}

export default function GoogleCallbackPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
    </div>
  );
}
