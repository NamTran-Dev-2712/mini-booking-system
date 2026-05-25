import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router";
import { toast } from "sonner";
import { getApiErrorMessage } from "~/lib/api-error";
import i18n from "~/lib/i18n";
import { authService } from "~/services/auth/auth.service";
import {
  resetPasswordSchema,
  type ResetPasswordFormData,
} from "./reset-password.schema";

export function useResetPasswordForm() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const email = searchParams.get("email") ?? "";
  const token = searchParams.get("token") ?? "";

  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email,
      token,
      otpCode: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(data: ResetPasswordFormData) {
    try {
      await authService.resetPassword({
        email: data.email,
        token: data.token,
        otpCode: data.otpCode,
        newPassword: data.newPassword,
      });
      toast.success(i18n.t("toast.passwordReset"), {
        description: i18n.t("toast.passwordResetDesc"),
      });
      navigate("/login");
    } catch (error) {
      toast.error(getApiErrorMessage(error));
    }
  }

  return { form, onSubmit: form.handleSubmit(onSubmit), email, token };
}
