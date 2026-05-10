import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { getApiErrorMessage } from "~/lib/api-error";
import { authService } from "~/services/auth/auth.service";
import { useAuthStore } from "~/stores/auth.store";
import { loginSchema, type LoginFormData } from "./login.schema";

export function useLoginForm() {
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: LoginFormData) {
    try {
      const result = await authService.login({
        email: data.email,
        password: data.password,
      });
      setUser({
        userId: result.userId,
        fullName: result.fullName,
        email: result.email,
        phoneNumber: result.phoneNumber,
        expiresIn: result.expiresIn,
        createdAt: result.createdAt,
      });
      navigate("/");
    } catch (error) {
      toast.error(getApiErrorMessage(error));
    }
  }

  return { form, onSubmit: form.handleSubmit(onSubmit) };
}
