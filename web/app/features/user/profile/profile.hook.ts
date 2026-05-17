import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useProfileQuery } from "~/hooks/auth/use-profile-query";
import { useUpdateProfileMutation } from "~/hooks/auth/use-update-profile-mutation";
import { userProfileSchema, type UserProfileFormData } from "./profile.schema";

export function useUserProfileForm() {
  const { data: profile, isPending } = useProfileQuery();
  const mutation = useUpdateProfileMutation();

  const form = useForm<UserProfileFormData>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: {
      fullName: "",
      phoneNumber: "",
    },
  });

  useEffect(() => {
    if (profile) {
      form.reset({
        fullName: profile.fullName,
        phoneNumber: profile.phoneNumber,
      });
    }
  }, [profile, form]);

  function onSubmit(data: UserProfileFormData) {
    mutation.mutate(data);
  }

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    isPending,
    isSubmitting: mutation.isPending,
  };
}
