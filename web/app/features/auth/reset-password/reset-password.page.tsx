import AuthLayout from "~/components/layouts/auth/auth.layout";
import { ResetPasswordForm } from "./reset-password.form";

export function meta() {
  return [
    { title: "Reset Password — MiniBooking" },
    { name: "description", content: "Set a new password for your account" },
  ];
}

export default function ResetPasswordPage() {
  return (
    <AuthLayout
      title="Reset your password"
      description="Enter the OTP code from your email and choose a new password."
    >
      <ResetPasswordForm />
    </AuthLayout>
  );
}
