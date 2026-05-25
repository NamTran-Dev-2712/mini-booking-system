import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { getApiErrorMessage } from "~/lib/api-error";
import i18n from "~/lib/i18n";
import { authService } from "~/services/auth/auth.service";
import {
  forgotPasswordSchema,
  type ForgotPasswordFormData,
} from "./forgot-password.schema";

export function useForgotPasswordForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(data: ForgotPasswordFormData) {
    try {
      await authService.forgotPassword({ email: data.email });
      setIsSubmitted(true);
      toast.success(i18n.t("toast.forgotPasswordSent"), {
        description: i18n.t("toast.forgotPasswordSentDesc"),
      });
    } catch (error) {
      toast.error(getApiErrorMessage(error));
    }
  }

  return { form, onSubmit: form.handleSubmit(onSubmit), isSubmitted };
}
