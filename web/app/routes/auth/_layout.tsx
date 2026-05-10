import { Outlet } from "react-router";
import { redirectIfAuthenticated } from "~/guards/require-role";

// Redirect already-authenticated users away from login/register
export const clientLoader = redirectIfAuthenticated;

export function HydrateFallback() {
  return null;
}

// Auth routes do not use the public layout (header/footer)
// Each page renders its own full-screen AuthLayout
export default function AuthRoutesLayout() {
  return <Outlet />;
}
