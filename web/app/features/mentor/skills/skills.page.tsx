import { GraduationCap, Loader2, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";
import { Skeleton } from "~/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { MentorSkillsForm } from "~/features/admin/mentor/components/mentor-skills-form";
import { useMyMentorProfile } from "~/hooks/mentor/use-my-mentor-profile";
import { useRemoveMentorSkillMutation } from "~/hooks/mentor/use-remove-mentor-skill-mutation";

export function meta() {
  return [{ title: "My Skills — MiniBooking" }];
}

export default function MentorSkills() {
  const { t } = useTranslation("mentor");
  const { mentor, mentorId, isPending } = useMyMentorProfile();
  const {
    mutate: removeSkill,
    isPending: isRemoving,
    variables,
  } = useRemoveMentorSkillMutation();

  if (isPending) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-32 w-full" />
      </div>
    );
  }

  const skills = mentor?.skills ?? [];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">
          {t("skills.title")}
        </h2>
        <p className="text-muted-foreground">{t("skills.subtitle")}</p>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">{t("skills.addNewSkill")}</CardTitle>
        </CardHeader>
        <CardContent>
          {mentorId && <MentorSkillsForm mentorId={mentorId} />}
        </CardContent>
      </Card>

      <Separator />

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">
            {t("skills.currentSkills")}
            <span className="ml-2 text-xs font-normal text-muted-foreground">
              ({skills.length})
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {skills.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-10 text-center">
              <GraduationCap className="mb-3 size-8 text-muted-foreground/50" />
              <p className="text-sm text-muted-foreground">
                {t("skills.noSkills")}
              </p>
              <p className="mt-1 text-xs text-muted-foreground/70">
                {t("skills.noSkillsHint")}
              </p>
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => {
                const removing = isRemoving && variables?.skillId === skill.id;

                return (
                  <Badge
                    key={skill.id}
                    variant="secondary"
                    className="gap-1.5 px-3 py-1.5 text-sm"
                  >
                    {skill.skillName}
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          type="button"
                          onClick={() =>
                            mentorId &&
                            removeSkill({ mentorId, skillId: skill.id })
                          }
                          disabled={removing}
                          className="ml-0.5 rounded-full p-0.5 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive disabled:opacity-50"
                          aria-label={t("skills.removeSkillLabel", {
                            name: skill.skillName,
                          })}
                        >
                          {removing ? (
                            <Loader2 className="size-3 animate-spin" />
                          ) : (
                            <X className="size-3" />
                          )}
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>{t("skills.removeSkill")}</TooltipContent>
                    </Tooltip>
                  </Badge>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
