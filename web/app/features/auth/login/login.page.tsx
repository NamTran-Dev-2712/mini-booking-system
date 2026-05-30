import { useTranslation } from "react-i18next";
import AuthLayout from "~/components/layouts/auth/auth.layout";
import { LoginForm } from "./login.form";

export function meta() {
  return [
    { title: "Sign In — MiniBooking" },
    { name: "description", content: "Sign in to your MiniBooking account" },
  ];
}

export default function LoginPage() {
  const { t } = useTranslation("auth");
  return (
    <AuthLayout
      title={t("login.pageTitle")}
      description={t("login.pageDescription")}
    >
      <LoginForm />
    </AuthLayout>
  );
}
