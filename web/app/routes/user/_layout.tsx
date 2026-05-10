import { Outlet } from "react-router";
import { AppLayout } from "~/components/layouts/shared/app-layout";
import { userNavItems } from "~/components/layouts/shared/nav-config";
import { requireRole } from "~/guards/require-role";

export const clientLoader = requireRole("User");

export function HydrateFallback() {
  return <div className="h-screen animate-pulse bg-muted" />;
}

export default function UserLayout() {
  return (
    <AppLayout navItems={userNavItems}>
      <Outlet />
    </AppLayout>
  );
}
