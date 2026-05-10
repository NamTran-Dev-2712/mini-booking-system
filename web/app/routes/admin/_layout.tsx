import { Outlet } from "react-router";
import { AppLayout } from "~/components/layouts/shared/app-layout";
import { adminNavItems } from "~/components/layouts/shared/nav-config";
import { requireRole } from "~/guards/require-role";

export const clientLoader = requireRole("Admin");

export function HydrateFallback() {
  return <div className="h-screen animate-pulse bg-muted" />;
}

export default function AdminLayout() {
  return (
    <AppLayout navItems={adminNavItems}>
      <Outlet />
    </AppLayout>
  );
}
