import { z } from "zod";

export const addSkillSchema = z.object({
  skillName: z
    .string()
    .min(1, "Skill name is required")
    .max(100, "Skill name must not exceed 100 characters"),
});

export type AddSkillFormData = z.infer<typeof addSkillSchema>;
