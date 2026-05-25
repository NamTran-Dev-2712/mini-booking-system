import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getApiErrorMessage } from "~/lib/api-error";
import i18n from "~/lib/i18n";
import { queryKeys } from "~/lib/query-keys";
import { mentorService } from "~/services/mentor/mentor.service";
import type { CreateMentorRequest } from "~/services/mentor/dtos/commands/create-mentor/request";

export function useCreateMentorMutation() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (body: CreateMentorRequest) => mentorService.createMentor(body),

    onSuccess: () => {
      // Invalidate all list variants so the new mentor appears
      qc.invalidateQueries({ queryKey: queryKeys.mentors.lists() });
      toast.success(i18n.t("toast.mentorCreated"), {
        description: i18n.t("toast.mentorCreatedDesc"),
      });
    },

    onError: (err) => {
      toast.error(getApiErrorMessage(err));
    },
  });
}
