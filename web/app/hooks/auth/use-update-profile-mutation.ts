import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getApiErrorMessage } from "~/lib/api-error";
import i18n from "~/lib/i18n";
import { queryKeys } from "~/lib/query-keys";
import { authService } from "~/services/auth/auth.service";
import type { UpdateProfileRequest } from "~/services/auth/dtos/commands/update-profile/update-profile.request";
import { useAuthStore } from "~/stores/auth.store";

export function useUpdateProfileMutation() {
  const queryClient = useQueryClient();
  const user = useAuthStore((s) => s.user);
  const setUser = useAuthStore((s) => s.setUser);

  return useMutation({
    mutationFn: (data: UpdateProfileRequest) => authService.updateProfile(data),
    onSuccess: (_data, variables) => {
      if (user) {
        setUser({
          ...user,
          fullName: variables.fullName ?? user.fullName,
          phoneNumber: variables.phoneNumber ?? user.phoneNumber,
        });
      }

      queryClient.invalidateQueries({ queryKey: queryKeys.auth.profile() });
      queryClient.invalidateQueries({ queryKey: queryKeys.mentors.all() });

      toast.success(i18n.t("toast.profileUpdated"));
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
}
