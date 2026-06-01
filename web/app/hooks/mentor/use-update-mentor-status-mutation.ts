import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getApiErrorMessage } from "~/lib/api-error";
import i18n from "~/lib/i18n";
import { queryKeys } from "~/lib/query-keys";
import { mentorService } from "~/services/mentor/mentor.service";

interface UpdateMentorStatusVariables {
  id: string;
  isActive: boolean;
}

export function useUpdateMentorStatusMutation() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, isActive }: UpdateMentorStatusVariables) =>
      mentorService.updateMentorStatus(id, isActive),

    onSuccess: (_data, { id, isActive }) => {
      qc.invalidateQueries({ queryKey: queryKeys.mentors.detail(id) });
      qc.invalidateQueries({ queryKey: queryKeys.mentors.lists() });
      toast.success(
        i18n.t(isActive ? "toast.mentorUnlocked" : "toast.mentorLocked"),
      );
    },

    onError: (err) => {
      toast.error(getApiErrorMessage(err));
    },
  });
}
