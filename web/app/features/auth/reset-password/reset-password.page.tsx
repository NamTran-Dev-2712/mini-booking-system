import { useTranslation } from "react-i18next";
import AuthLayout from "~/components/layouts/auth/auth.layout";
import { ResetPasswordForm } from "./reset-password.form";

export function meta() {
  return [
    { title: "Reset Password — MiniBooking" },
    { name: "description", content: "Set a new password for your account" },
  ];
}

export default function ResetPasswordPage() {
  const { t } = useTranslation("auth");
  return (
    <AuthLayout
      title={t("resetPassword.pageTitle")}
      description={t("resetPassword.pageDescription")}
    >
      <ResetPasswordForm />
    </AuthLayout>
  );
}
