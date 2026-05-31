import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { AvatarUpload } from "~/components/shared/avatar-upload";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { MENTOR_SOCIAL_FIELDS } from "~/components/shared/mentor/social-links";
import {
  createMentorSchema,
  updateMentorSchema,
  type CreateMentorFormData,
  type UpdateMentorFormData,
} from "../schemas/mentor.schema";
import type { Mentor } from "~/types/mentor/mentor";

// ── Create form ────────────────────────────────────────────────────────────

interface CreateMentorFormProps {
  mode: "create";
  onSubmit: (data: CreateMentorFormData) => Promise<void>;
  isSubmitting?: boolean;
}

// ── Update form ────────────────────────────────────────────────────────────

interface UpdateMentorFormProps {
  mode: "update";
  defaultValues: Partial<UpdateMentorFormData>;
  onSubmit: (data: UpdateMentorFormData) => Promise<void>;
  isSubmitting?: boolean;
}

type MentorFormProps = CreateMentorFormProps | UpdateMentorFormProps;

export function MentorForm(props: MentorFormProps) {
  const { t } = useTranslation("mentor");
  const isCreate = props.mode === "create";

  const form = useForm<CreateMentorFormData | UpdateMentorFormData>({
    resolver: zodResolver(isCreate ? createMentorSchema : updateMentorSchema),
    defaultValues: isCreate
      ? {
          fullName: "",
          email: "",
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
        }
      : (props as UpdateMentorFormProps).defaultValues,
  });

  const isSubmitting = props.isSubmitting ?? form.formState.isSubmitting;

  async function handleSubmit(
    data: CreateMentorFormData | UpdateMentorFormData,
  ) {
    if (isCreate) {
      await (props as CreateMentorFormProps).onSubmit(
        data as CreateMentorFormData,
      );
    } else {
      await (props as UpdateMentorFormProps).onSubmit(
        data as UpdateMentorFormData,
      );
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-4"
        id="mentor-form"
      >
        {isCreate && (
          <>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("profile.fullName")} *</FormLabel>
                    <FormControl>
                      <Input placeholder="Nguyễn Văn A" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email *</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="mentor@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("profile.phoneNumber")} *</FormLabel>
                  <FormControl>
                    <Input placeholder="0912345678" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        {!isCreate && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("profile.fullName")}</FormLabel>
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
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("profile.phoneNumber")}</FormLabel>
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
          </div>
        )}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="displayName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("profile.displayName")}</FormLabel>
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
          <FormField
            control={form.control}
            name="specialization"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("profile.specialization")}</FormLabel>
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

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="experienceYears"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("profile.experienceYears")}</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={0}
                    max={50}
                    {...field}
                    value={field.value ?? 0}
                    onChange={(e) => field.onChange(Number(e.target.value))}
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
                <FormLabel>{t("profile.basePrice")}</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={0}
                    step={1000}
                    placeholder="150000"
                    {...field}
                    value={field.value ?? 0}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("profile.bio")}</FormLabel>
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

        <FormField
          control={form.control}
          name="avatarUrl"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <AvatarUpload
                  currentUrl={field.value}
                  onUploaded={(url) => field.onChange(url)}
                  fallback={
                    form.watch("displayName")?.charAt(0) ||
                    form.watch("fullName")?.charAt(0) ||
                    "M"
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-4">
          <h4 className="text-sm font-medium text-muted-foreground">
            {t("profile.socialLinks", { defaultValue: "Social Links" })}
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
                      {t(social.labelKey)}
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

        <Button
          type="submit"
          className="w-full"
          disabled={isSubmitting}
          form="mentor-form"
        >
          {isSubmitting && <Loader2 className="mr-2 size-4 animate-spin" />}
          {isCreate
            ? t("list.createFirstMentor", { defaultValue: "Create Mentor" })
            : t("columns.edit", { defaultValue: "Save Changes" })}
        </Button>
      </form>
    </Form>
  );
}
