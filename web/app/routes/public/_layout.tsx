import { Outlet } from "react-router";
import PublicLayoutComponent from "~/components/layouts/public/public.layout";
import { useAuthStore } from "~/stores/auth.store";

// Rehydrate store so the header can read auth state on public pages
export async function clientLoader() {
  await useAuthStore.persist.rehydrate();
  return null;
}

export function HydrateFallback() {
  return null;
}

export default function PublicLayout() {
  return (
    <PublicLayoutComponent>
      <Outlet />
    </PublicLayoutComponent>
  );
}
