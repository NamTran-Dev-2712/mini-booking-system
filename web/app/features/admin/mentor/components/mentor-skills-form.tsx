import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { useAddMentorSkillMutation } from "~/hooks/mentor/use-add-mentor-skill-mutation";
import {
  addSkillSchema,
  type AddSkillFormData,
} from "../schemas/mentor-skill.schema";

interface MentorSkillsFormProps {
  mentorId: string;
}

export function MentorSkillsForm({ mentorId }: MentorSkillsFormProps) {
  const { t } = useTranslation("mentor");
  const { mutateAsync, isPending } = useAddMentorSkillMutation();

  const form = useForm<AddSkillFormData>({
    resolver: zodResolver(addSkillSchema),
    defaultValues: { skillName: "" },
  });

  async function onSubmit(data: AddSkillFormData) {
    await mutateAsync({ mentorId, skillName: data.skillName });
    form.reset();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex items-start gap-2"
      >
        <FormField
          control={form.control}
          name="skillName"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input
                  placeholder={t("skills.addSkillPlaceholder")}
                  {...field}
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          size="sm"
          disabled={isPending}
          className="gap-1.5"
        >
          {isPending ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Plus className="size-4" />
          )}
          {t("skills.addSkill")}
        </Button>
      </form>
    </Form>
  );
}
