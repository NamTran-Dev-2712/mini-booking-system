import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { getApiErrorMessage } from "~/lib/api-error";
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
      toast.success("Check your email", {
        description:
          "If an account exists with this email, you'll receive a reset link shortly.",
      });
    } catch (error) {
      toast.error(getApiErrorMessage(error));
    }
  }

  return { form, onSubmit: form.handleSubmit(onSubmit), isSubmitted };
}
