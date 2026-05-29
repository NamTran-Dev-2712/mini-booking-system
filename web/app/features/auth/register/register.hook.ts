import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { getApiErrorMessage } from "~/lib/api-error";
import i18n from "~/lib/i18n";
import { authService } from "~/services/auth/auth.service";
import { registerSchema, type RegisterFormData } from "./register.schema";

export type RegisterRole = "User" | "Mentor";

export function useRegisterForm(role: RegisterRole) {
  const navigate = useNavigate();

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
      avatarUrl: "",
    },
  });

  async function onSubmit(data: RegisterFormData) {
    try {
      const payload = {
        fullName: data.fullName,
        email: data.email,
        password: data.password,
        phoneNumber: data.phoneNumber,
        avatarUrl: data.avatarUrl || null,
      };
      if (role === "Mentor") {
        await authService.registerMentor(payload);
      } else {
        await authService.register(payload);
      }
      toast.success(i18n.t("toast.registered"));
      navigate("/login");
    } catch (error) {
      toast.error(getApiErrorMessage(error));
    }
  }

  return { form, onSubmit: form.handleSubmit(onSubmit) };
}
