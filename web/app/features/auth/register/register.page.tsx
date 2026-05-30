import { useTranslation } from "react-i18next";
import AuthLayout from "~/components/layouts/auth/auth.layout";
import { RegisterForm } from "./register.form";

export function meta() {
  return [
    { title: "Sign Up — MiniBooking" },
    { name: "description", content: "Create your free MiniBooking account" },
  ];
}

export default function RegisterPage() {
  const { t } = useTranslation("auth");
  return (
    <AuthLayout
      title={t("register.pageTitle")}
      description={t("register.pageDescription")}
    >
      <RegisterForm />
    </AuthLayout>
  );
}
