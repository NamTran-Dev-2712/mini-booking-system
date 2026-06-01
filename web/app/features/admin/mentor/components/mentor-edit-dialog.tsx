import { zodResolver } from "@hookform/resolvers/zod";
import {
  Eye,
  EyeOff,
  GraduationCap,
  Loader2,
  Plus,
  User,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHotkeys } from "react-hotkeys-hook";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Separator } from "~/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Textarea } from "~/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { useAddMentorSkillMutation } from "~/hooks/mentor/use-add-mentor-skill-mutation";
import { useRemoveMentorSkillMutation } from "~/hooks/mentor/use-remove-mentor-skill-mutation";
import { useUpdateMentorMutation } from "~/hooks/mentor/use-update-mentor-mutation";
import { MENTOR_SOCIAL_FIELDS } from "~/components/shared/mentor/social-links";
import { HotkeyScopes } from "~/lib/hotkeys/hotkey-scopes";
import type { MentorDetail, MentorSkill } from "~/types/mentor/mentor";
import {
  addSkillSchema,
  type AddSkillFormData,
} from "../schemas/mentor-skill.schema";
import {
  updateMentorSchema,
  type UpdateMentorFormData,
} from "../schemas/mentor.schema";

// ── Skill inline form ──────────────────────────────────────────────────────

function InlineSkillForm({ mentorId }: { mentorId: string }) {
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
                  placeholder="Add a skill (e.g. React, Node.js)"
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
          Add
        </Button>
      </form>
    </Form>
  );
}

// ── Skills list with remove ─────────────────────────────────────────────────

function SkillsList({
  mentorId,
  skills,
}: {
  mentorId: string;
  skills: MentorSkill[];
}) {
  const {
    mutate: removeSkill,
    isPending,
    variables,
  } = useRemoveMentorSkillMutation();

  return (
    <div>
      <h3 className="mb-3 text-sm font-medium">
        Current Skills
        <span className="ml-2 text-xs text-muted-foreground">
          ({skills.length})
        </span>
      </h3>

      {skills.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-10 text-center">
          <GraduationCap className="mb-3 size-8 text-muted-foreground/50" />
          <p className="text-sm text-muted-foreground">No skills added yet.</p>
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
                      aria-label={`Remove ${skill.skillName}`}
                    >
                      {isRemoving ? (
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
    </div>
  );
}

// ── Main dialog ────────────────────────────────────────────────────────────

interface MentorEditDialogProps {
  /** Pass the full MentorDetail so skills are available in the Skills tab */
  mentor: MentorDetail | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MentorEditDialog({
  mentor,
  open,
  onOpenChange,
}: MentorEditDialogProps) {
  const { mutateAsync, isPending } = useUpdateMentorMutation();
  const [activeTab, setActiveTab] = useState<"profile" | "skills">("profile");

  const form = useForm<UpdateMentorFormData>({
    resolver: zodResolver(updateMentorSchema),
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      displayName: "",
      bio: "",
      specialization: "",
      experienceYears: 0,
      basePrice: 0,
      avatarUrl: "",
      facebookUrl: "",
      githubUrl: "",
      linkedInUrl: "",
      telegramUrl: "",
      websiteUrl: "",
    },
  });

  // ── Pre-fill form whenever mentor changes or dialog opens ────────────────
  // This is the key fix: useForm defaultValues only apply on mount.
  // We must call reset() explicitly when the mentor data arrives.
  useEffect(() => {
    if (mentor && open) {
      form.reset({
        fullName: mentor.displayName ?? "",
        phoneNumber: mentor.phoneNumber ?? "", // now populated from API via ApplicationUser
        displayName: mentor.displayName ?? "",
        bio: mentor.bio ?? "",
        specialization: mentor.specialization ?? "",
        experienceYears: mentor.experienceYears ?? 0,
        basePrice: mentor.basePrice ?? 0,
        avatarUrl: mentor.avatarUrl ?? "",
        facebookUrl: mentor.facebookUrl ?? "",
        githubUrl: mentor.githubUrl ?? "",
        linkedInUrl: mentor.linkedInUrl ?? "",
        telegramUrl: mentor.telegramUrl ?? "",
        websiteUrl: mentor.websiteUrl ?? "",
      });
      setActiveTab("profile");
    }
  }, [mentor?.id, open]); // re-run when mentor id changes or dialog opens

  // Cmd+S submits the profile form
  useHotkeys(
    "mod+s",
    (e) => {
      e.preventDefault();
      document
        .getElementById("mentor-edit-form")
        ?.dispatchEvent(
          new Event("submit", { cancelable: true, bubbles: true }),
        );
    },
    { scopes: HotkeyScopes.Form, enabled: open && activeTab === "profile" },
  );

  if (!mentor) return null;

  async function handleSubmit(data: UpdateMentorFormData) {
    if (!mentor) return;
    await mutateAsync({
      id: mentor.id,
      body: {
        fullName: data.fullName || null,
        phoneNumber: data.phoneNumber || null,
        displayName: data.displayName || null,
        bio: data.bio || null,
        specialization: data.specialization || null,
        experienceYears: data.experienceYears ?? null,
        basePrice: data.basePrice ?? null,
        avatarUrl: data.avatarUrl || null,
        facebookUrl: data.facebookUrl || null,
        githubUrl: data.githubUrl || null,
        linkedInUrl: data.linkedInUrl || null,
        telegramUrl: data.telegramUrl || null,
        websiteUrl: data.websiteUrl || null,
      },
    });
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="flex max-h-[90vh] w-full max-w-2xl flex-col gap-0 overflow-hidden p-0"
        onInteractOutside={(e) => isPending && e.preventDefault()}
        onEscapeKeyDown={(e) => isPending && e.preventDefault()}
      >
        {/* Fixed header */}
        <DialogHeader className="shrink-0 border-b px-6 py-5">
          <DialogTitle className="text-lg">
            Edit Mentor — {mentor.displayName}
          </DialogTitle>
          <DialogDescription>
            Update profile information or manage skills.
          </DialogDescription>
        </DialogHeader>

        {/* Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={(v) => setActiveTab(v as "profile" | "skills")}
          className="flex min-h-0 flex-1 flex-col overflow-hidden"
        >
          <TabsList className="mx-6 mt-4 w-auto self-start">
            <TabsTrigger value="profile" className="gap-1.5">
              <User className="size-3.5" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="skills" className="gap-1.5">
              <GraduationCap className="size-3.5" />
              Skills
              {mentor.skills.length > 0 && (
                <Badge
                  variant="secondary"
                  className="ml-1 h-4 px-1.5 text-[10px]"
                >
                  {mentor.skills.length}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          {/* ── Profile tab ──────────────────────────────────────────── */}
          {/* Native overflow scroll on the flex-bounded TabsContent — reliable
              regardless of nested flex depth (Radix ScrollArea was not picking
              up the bounded height here). */}
          <TabsContent
            value="profile"
            className="mt-0 min-h-0 flex-1 overflow-y-auto"
          >
            <div className="px-6 py-5">
              <Form {...form}>
                <form
                  id="mentor-edit-form"
                  onSubmit={form.handleSubmit(handleSubmit)}
                  className="space-y-4"
                >
                  {/* Full name + Display name */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Nguyễn Văn A"
                              {...field}
                              value={field.value ?? ""}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="displayName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Display Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Mentor Huy"
                              {...field}
                              value={field.value ?? ""}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Phone + Specialization */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="phoneNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="0912345678"
                              {...field}
                              value={field.value ?? ""}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="specialization"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Specialization</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="React, Node.js..."
                              {...field}
                              value={field.value ?? ""}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Experience + Base price */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="experienceYears"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Experience (years)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min={0}
                              max={50}
                              {...field}
                              value={field.value ?? 0}
                              onChange={(e) =>
                                field.onChange(Number(e.target.value))
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="basePrice"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Base Price (VND)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min={0}
                              step={1000}
                              {...field}
                              value={field.value ?? 0}
                              onChange={(e) =>
                                field.onChange(Number(e.target.value))
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Bio */}
                  <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bio</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us about this mentor..."
                            className="resize-none"
                            rows={3}
                            {...field}
                            value={field.value ?? ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Avatar URL */}
                  <FormField
                    control={form.control}
                    name="avatarUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Avatar URL</FormLabel>
                        <FormControl>
                          <Input
                            type="url"
                            placeholder="https://..."
                            {...field}
                            value={field.value ?? ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Social links */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium text-muted-foreground">
                      Social Links
                    </h4>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      {MENTOR_SOCIAL_FIELDS.map((social) => (
                        <FormField
                          key={social.key}
                          control={form.control}
                          name={social.key}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="flex items-center gap-1.5">
                                <social.icon className="size-3.5 text-muted-foreground" />
                                {social.label}
                              </FormLabel>
                              <FormControl>
                                <Input
                                  type="url"
                                  placeholder={social.placeholder}
                                  {...field}
                                  value={field.value ?? ""}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Submit */}
                  <Button type="submit" className="w-full" disabled={isPending}>
                    {isPending && (
                      <Loader2 className="mr-2 size-4 animate-spin" />
                    )}
                    Save Changes
                  </Button>
                </form>
              </Form>
            </div>
          </TabsContent>

          {/* ── Skills tab ───────────────────────────────────────────── */}
          <TabsContent
            value="skills"
            className="mt-0 min-h-0 flex-1 overflow-y-auto"
          >
            <div className="space-y-6 px-6 py-5">
              {/* Add skill */}
              <div>
                <h3 className="mb-3 text-sm font-medium">Add Skill</h3>
                <InlineSkillForm mentorId={mentor.id} />
              </div>

              <Separator />

              {/* Current skills */}
              <SkillsList mentorId={mentor.id} skills={mentor.skills} />
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
