import AuthLayout from "~/components/layouts/auth/auth.layout";
import { LoginForm } from "./login.form";

export function meta() {
  return [
    { title: "Sign In — MiniBooking" },
    { name: "description", content: "Sign in to your MiniBooking account" },
  ];
}

export default function LoginPage() {
  return (
    <AuthLayout
      title="Welcome Back"
      description="Sign in to your account to continue"
    >
      <LoginForm />
    </AuthLayout>
  );
}
