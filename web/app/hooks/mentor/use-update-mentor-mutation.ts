import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getApiErrorMessage } from "~/lib/api-error";
import i18n from "~/lib/i18n";
import { queryKeys } from "~/lib/query-keys";
import { mentorService } from "~/services/mentor/mentor.service";
import type { UpdateMentorRequest } from "~/services/mentor/dtos/commands/update-mentor/request";

interface UpdateMentorVariables {
  id: string;
  body: Omit<UpdateMentorRequest, "id">;
}

export function useUpdateMentorMutation() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, body }: UpdateMentorVariables) =>
      mentorService.updateMentor(id, body),

    onSuccess: (_data, { id }) => {
      // Invalidate both the specific detail and all list variants
      qc.invalidateQueries({ queryKey: queryKeys.mentors.detail(id) });
      qc.invalidateQueries({ queryKey: queryKeys.mentors.lists() });
      toast.success(i18n.t("toast.mentorUpdated"));
    },

    onError: (err) => {
      toast.error(getApiErrorMessage(err));
    },
  });
}
