import AuthLayout from "~/components/layouts/auth/auth.layout";
import { ForgotPasswordForm } from "./forgot-password.form";

export function meta() {
  return [
    { title: "Forgot Password — MiniBooking" },
    { name: "description", content: "Reset your MiniBooking account password" },
  ];
}

export default function ForgotPasswordPage() {
  return (
    <AuthLayout
      title="Forgot your password?"
      description="Enter your email address and we'll send you a link to reset your password."
    >
      <ForgotPasswordForm />
    </AuthLayout>
  );
}
