import { GraduationCap, Loader2, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { useRemoveMentorSkillMutation } from "~/hooks/mentor/use-remove-mentor-skill-mutation";
import type { MentorSkill } from "~/types/mentor/mentor";
import { MentorSkillsForm } from "./mentor-skills-form";

interface MentorSkillsTabProps {
  mentorId: string;
  skills: MentorSkill[];
}

export function MentorSkillsTab({ mentorId, skills }: MentorSkillsTabProps) {
  const { t } = useTranslation("mentor");
  const {
    mutate: removeSkill,
    isPending,
    variables,
  } = useRemoveMentorSkillMutation();

  return (
    <div className="space-y-6">
      {/* Add skill */}
      <div>
        <h3 className="mb-3 text-sm font-medium">{t("skillsTab.addSkill")}</h3>
        <MentorSkillsForm mentorId={mentorId} />
      </div>

      <Separator />

      {/* Skills list */}
      <div>
        <h3 className="mb-3 text-sm font-medium">
          {t("skillsTab.currentSkills")}
          <span className="ml-2 text-xs text-muted-foreground">
            ({skills.length})
          </span>
        </h3>

        {skills.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-10 text-center">
            <GraduationCap className="mb-3 size-8 text-muted-foreground/50" />
            <p className="text-sm text-muted-foreground">
              {t("skillsTab.noSkillsYet")}
            </p>
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => {
              const isRemoving = isPending && variables?.skillId === skill.id;

              return (
                <Badge
                  key={skill.id}
                  variant="secondary"
                  className="gap-1.5 px-3 py-1 text-sm"
                >
                  {skill.skillName}
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        type="button"
                        onClick={() =>
                          removeSkill({ mentorId, skillId: skill.id })
                        }
                        disabled={isRemoving}
                        className="ml-0.5 rounded-full p-0.5 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive disabled:opacity-50"
                        aria-label={t("skills.removeSkillLabel", {
                          name: skill.skillName,
                        })}
                      >
                        {isRemoving ? (
                          <Loader2 className="size-3 animate-spin" />
                        ) : (
                          <X className="size-3" />
                        )}
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      {t("skillsTab.removeSkill")}
                    </TooltipContent>
                  </Tooltip>
                </Badge>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
