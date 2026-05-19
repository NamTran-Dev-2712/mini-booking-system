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
  return (
    <AuthLayout
      title="Complete Your Profile"
      description="We need your phone number to finish setting up your account"
    >
      <CompleteProfileForm />
    </AuthLayout>
  );
}
