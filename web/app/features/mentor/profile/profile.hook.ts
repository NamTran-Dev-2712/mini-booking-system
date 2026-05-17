import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useProfileQuery } from "~/hooks/auth/use-profile-query";
import { useUpdateProfileMutation } from "~/hooks/auth/use-update-profile-mutation";
import { useMyMentorProfile } from "~/hooks/mentor/use-my-mentor-profile";
import {
  mentorProfileSchema,
  type MentorProfileFormData,
} from "./profile.schema";

export function useMentorProfileForm() {
  const { data: profile, isPending: isProfilePending } = useProfileQuery();
  const { mentor, isPending: isMentorPending } = useMyMentorProfile();
  const mutation = useUpdateProfileMutation();

  const form = useForm<MentorProfileFormData>({
    resolver: zodResolver(mentorProfileSchema),
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      displayName: "",
      bio: "",
      specialization: "",
      experienceYears: 0,
      basePrice: 0,
      avatarUrl: "",
    },
  });

  useEffect(() => {
    if (profile && mentor) {
      form.reset({
        fullName: profile.fullName,
        phoneNumber: profile.phoneNumber,
        displayName: mentor.displayName ?? "",
        bio: mentor.bio ?? "",
        specialization: mentor.specialization ?? "",
        experienceYears: mentor.experienceYears,
        basePrice: mentor.basePrice,
        avatarUrl: mentor.avatarUrl ?? "",
      });
    }
  }, [profile, mentor, form]);

  function onSubmit(data: MentorProfileFormData) {
    mutation.mutate({
      fullName: data.fullName,
      phoneNumber: data.phoneNumber,
      displayName: data.displayName || undefined,
      bio: data.bio || undefined,
      specialization: data.specialization || undefined,
      experienceYears: data.experienceYears,
      basePrice: data.basePrice,
      avatarUrl: data.avatarUrl || undefined,
    });
  }

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    isPending: isProfilePending || isMentorPending,
    isSubmitting: mutation.isPending,
  };
}
