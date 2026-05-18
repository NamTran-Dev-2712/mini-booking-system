import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useProfileQuery } from "~/hooks/auth/use-profile-query";
import { useUpdateProfileMutation } from "~/hooks/auth/use-update-profile-mutation";
import {
  adminProfileSchema,
  type AdminProfileFormData,
} from "./profile.schema";

export function useAdminProfileForm() {
  const { data: profile, isPending } = useProfileQuery();
  const mutation = useUpdateProfileMutation();

  const form = useForm<AdminProfileFormData>({
    resolver: zodResolver(adminProfileSchema),
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      avatarUrl: "",
    },
  });

  useEffect(() => {
    if (profile) {
      form.reset({
        fullName: profile.fullName,
        phoneNumber: profile.phoneNumber,
        avatarUrl: (profile as any).avatarUrl ?? "",
      });
    }
  }, [profile, form]);

  function onSubmit(data: AdminProfileFormData) {
    mutation.mutate({
      fullName: data.fullName,
      phoneNumber: data.phoneNumber,
      avatarUrl: data.avatarUrl || undefined,
    });
  }

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    isPending,
    isSubmitting: mutation.isPending,
  };
}
