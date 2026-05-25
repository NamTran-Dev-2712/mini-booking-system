import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { getApiErrorMessage } from "~/lib/api-error";
import i18n from "~/lib/i18n";
import { authService } from "~/services/auth/auth.service";
import { useAuthStore } from "~/stores/auth.store";
import {
  completeProfileSchema,
  type CompleteProfileFormData,
} from "./complete-profile.schema";

const ROLE_REDIRECT: Record<string, string> = {
  Admin: "/admin",
  Mentor: "/mentor",
  User: "/user",
};

export function useCompleteProfileForm() {
  const setUser = useAuthStore((state) => state.setUser);

  const form = useForm<CompleteProfileFormData>({
    resolver: zodResolver(completeProfileSchema),
    defaultValues: {
      phoneNumber: "",
    },
  });

  async function onSubmit(data: CompleteProfileFormData) {
    try {
      await authService.completeProfile({ phoneNumber: data.phoneNumber });
      const profile = await authService.getProfile();
      setUser({
        userId: profile.id.toString(),
        fullName: profile.fullName,
        email: profile.email,
        phoneNumber: profile.phoneNumber,
        roles: profile.roles,
        expiresIn: "",
        createdAt: profile.createdAt,
      });
      const primaryRole = profile.roles[0] ?? "User";
      toast.success(i18n.t("toast.profileCompleted"));
      window.location.href = ROLE_REDIRECT[primaryRole] ?? "/user";
    } catch (error) {
      toast.error(getApiErrorMessage(error));
    }
  }

  return { form, onSubmit: form.handleSubmit(onSubmit) };
}
