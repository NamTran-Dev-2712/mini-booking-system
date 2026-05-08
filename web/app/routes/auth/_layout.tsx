import { Outlet } from "react-router";

// Auth routes do not use the public layout (header/footer)
// Each page renders its own full-screen AuthLayout
export default function AuthRoutesLayout() {
  return <Outlet />;
}
