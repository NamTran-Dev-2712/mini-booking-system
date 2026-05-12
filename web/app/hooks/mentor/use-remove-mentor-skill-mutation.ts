import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getApiErrorMessage } from "~/lib/api-error";
import { queryKeys } from "~/lib/query-keys";
import { mentorService } from "~/services/mentor/mentor.service";

interface RemoveSkillVariables {
  mentorId: string;
  skillId: string;
}

export function useRemoveMentorSkillMutation() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ mentorId, skillId }: RemoveSkillVariables) =>
      mentorService.removeSkill(mentorId, skillId),

    onSuccess: (_data, { mentorId }) => {
      qc.invalidateQueries({ queryKey: queryKeys.mentors.detail(mentorId) });
      toast.success("Skill removed successfully");
    },

    onError: (err) => {
      toast.error(getApiErrorMessage(err));
    },
  });
}
