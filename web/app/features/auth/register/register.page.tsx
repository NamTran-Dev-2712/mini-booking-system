import AuthLayout from "~/components/layouts/auth/auth.layout";
import { RegisterForm } from "./register.form";

export function meta() {
  return [
    { title: "Sign Up — MiniBooking" },
    { name: "description", content: "Create your free MiniBooking account" },
  ];
}

export default function RegisterPage() {
  return (
    <AuthLayout
      title="Create Account"
      description="Start your mentorship journey completely free"
    >
      <RegisterForm />
    </AuthLayout>
  );
}
