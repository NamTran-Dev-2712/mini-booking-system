import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterFormData } from "./register.schema";

export function useRegisterForm() {
  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(data: RegisterFormData) {
    // TODO: integrate with auth service
    console.log("Register data:", data);
  }

  return { form, onSubmit: form.handleSubmit(onSubmit) };
}
