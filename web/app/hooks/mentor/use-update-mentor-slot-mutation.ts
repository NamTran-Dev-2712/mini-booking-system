import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getApiErrorMessage } from "~/lib/api-error";
import i18n from "~/lib/i18n";
import { queryKeys } from "~/lib/query-keys";
import { mentorService } from "~/services/mentor/mentor.service";
import type { UpdateSlotRequest } from "~/services/mentor/dtos/commands/update-slot/request";

type UpdateSlotVariables = Omit<UpdateSlotRequest, "id" | "mentorId"> & {
  mentorId: string;
  slotId: string;
};

export function useUpdateMentorSlotMutation() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ mentorId, slotId, ...body }: UpdateSlotVariables) =>
      mentorService.updateSlot(mentorId, slotId, body),

    onSuccess: (_data, { mentorId }) => {
      qc.invalidateQueries({ queryKey: queryKeys.mentors.detail(mentorId) });
      toast.success(i18n.t("toast.slotUpdated"));
    },

    onError: (err) => {
      toast.error(getApiErrorMessage(err));
    },
  });
}
