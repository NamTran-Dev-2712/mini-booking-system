import { Outlet } from "react-router";
import PublicLayoutComponent from "~/components/layouts/public/public.layout";

export default function PublicLayout() {
  return (
    <PublicLayoutComponent>
      <Outlet />
    </PublicLayoutComponent>
  );
}
