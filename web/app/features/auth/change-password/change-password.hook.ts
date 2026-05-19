import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { getApiErrorMessage } from "~/lib/api-error";
import { authService } from "~/services/auth/auth.service";
import { useAuthStore } from "~/stores/auth.store";
import {
  changePasswordSchema,
  type ChangePasswordFormData,
} from "./change-password.schema";

export function useChangePasswordForm() {
  const navigate = useNavigate();
  const clearUser = useAuthStore((state) => state.clearUser);

  const form = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(data: ChangePasswordFormData) {
    try {
      await authService.changePassword({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });
      toast.success("Password changed successfully", {
        description: "Please login again with your new password.",
      });
      clearUser();
      navigate("/login");
    } catch (error) {
      toast.error(getApiErrorMessage(error));
    }
  }

  return { form, onSubmit: form.handleSubmit(onSubmit) };
}
