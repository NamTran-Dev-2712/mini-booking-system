import { useTranslation } from "react-i18next";
import AuthLayout from "~/components/layouts/auth/auth.layout";
import { ForgotPasswordForm } from "./forgot-password.form";

export function meta() {
  return [
    { title: "Forgot Password — MiniBooking" },
    { name: "description", content: "Reset your MiniBooking account password" },
  ];
}

export default function ForgotPasswordPage() {
  const { t } = useTranslation("auth");
  return (
    <AuthLayout
      title={t("forgotPassword.pageTitle")}
      description={t("forgotPassword.pageDescription")}
    >
      <ForgotPasswordForm />
    </AuthLayout>
  );
}
