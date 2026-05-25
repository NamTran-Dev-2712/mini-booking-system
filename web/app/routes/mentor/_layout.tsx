import { Outlet } from "react-router";
import { AppLayout } from "~/components/layouts/shared/app-layout";
import {
  getVisibleNavItems,
  mentorNavItems,
} from "~/components/layouts/shared/nav-config";
import { requireRole } from "~/guards/require-role";

export const clientLoader = requireRole("Mentor");

export function HydrateFallback() {
  return <div className="h-screen animate-pulse bg-muted" />;
}

export default function MentorLayout() {
  return (
    <AppLayout navItems={getVisibleNavItems(mentorNavItems)}>
      <Outlet />
    </AppLayout>
  );
}
