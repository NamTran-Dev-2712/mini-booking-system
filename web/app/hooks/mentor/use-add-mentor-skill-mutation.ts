import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getApiErrorMessage } from "~/lib/api-error";
import { queryKeys } from "~/lib/query-keys";
import { mentorService } from "~/services/mentor/mentor.service";

interface AddSkillVariables {
  mentorId: string;
  skillName: string;
}

export function useAddMentorSkillMutation() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ mentorId, skillName }: AddSkillVariables) =>
      mentorService.addSkill(mentorId, { skillName }),

    onSuccess: (_data, { mentorId }) => {
      // Only the detail needs refreshing — list doesn't show skills
      qc.invalidateQueries({ queryKey: queryKeys.mentors.detail(mentorId) });
      toast.success("Skill added successfully");
    },

    onError: (err) => {
      toast.error(getApiErrorMessage(err));
    },
  });
}
