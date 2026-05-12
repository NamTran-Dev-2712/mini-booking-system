import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getApiErrorMessage } from "~/lib/api-error";
import { queryKeys } from "~/lib/query-keys";
import { mentorService } from "~/services/mentor/mentor.service";
import type { CreateSlotRequest } from "~/services/mentor/dtos/commands/create-slot/request";

type CreateSlotVariables = Omit<CreateSlotRequest, "mentorId"> & {
  mentorId: string;
};

export function useCreateMentorSlotMutation() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ mentorId, ...body }: CreateSlotVariables) =>
      mentorService.createSlot(mentorId, body),

    onSuccess: (_data, { mentorId }) => {
      qc.invalidateQueries({ queryKey: queryKeys.mentors.detail(mentorId) });
      toast.success("Slot created successfully");
    },

    onError: (err) => {
      toast.error(getApiErrorMessage(err));
    },
  });
}
