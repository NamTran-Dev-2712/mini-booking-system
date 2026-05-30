import { useTranslation } from "react-i18next";
import AuthLayout from "~/components/layouts/auth/auth.layout";
import { CompleteProfileForm } from "./complete-profile.form";

export function meta() {
  return [
    { title: "Complete Profile — MiniBooking" },
    {
      name: "description",
      content: "Complete your profile to start using MiniBooking",
    },
  ];
}

export default function CompleteProfilePage() {
  const { t } = useTranslation("auth");
  return (
    <AuthLayout
      title={t("completeProfile.pageTitle")}
      description={t("completeProfile.pageDescription")}
    >
      <CompleteProfileForm />
    </AuthLayout>
  );
}
