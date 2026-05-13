import { GraduationCap, Loader2, X } from "lucide-react";
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
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">My Skills</h2>
        <p className="text-muted-foreground">
          Add and manage the skills you mentor in.
        </p>
      </div>

      {/* Add skill form */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Add New Skill</CardTitle>
        </CardHeader>
        <CardContent>
          {mentorId && <MentorSkillsForm mentorId={mentorId} />}
        </CardContent>
      </Card>

      <Separator />

      {/* Skills list */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">
            Current Skills
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
                No skills added yet.
              </p>
              <p className="mt-1 text-xs text-muted-foreground/70">
                Add skills to let students know what you can teach.
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
                          aria-label={`Remove ${skill.skillName}`}
                        >
                          {removing ? (
                            <Loader2 className="size-3 animate-spin" />
                          ) : (
                            <X className="size-3" />
                          )}
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>Remove skill</TooltipContent>
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
