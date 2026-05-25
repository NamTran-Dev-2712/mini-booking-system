import { Loader2 } from "lucide-react";
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
import { Skeleton } from "~/components/ui/skeleton";
import { useAdminProfileForm } from "./profile.hook";

export function AdminProfileForm() {
  const { t } = useTranslation("auth");
  const { form, onSubmit, isPending, isSubmitting } = useAdminProfileForm();

  if (isPending) {
    return (
      <div className="space-y-4">
        <div className="flex justify-center">
          <Skeleton className="size-20 rounded-full" />
        </div>
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-6">
        <FormField
          control={form.control}
          name="avatarUrl"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <AvatarUpload
                  currentUrl={field.value}
                  onUploaded={(url) => field.onChange(url)}
                  fallback={form.watch("fullName")?.charAt(0) || "A"}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("profile.fullNameLabel")}</FormLabel>
                <FormControl>
                  <Input placeholder="Nguyễn Văn A" {...field} />
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
                <FormLabel>{t("profile.phoneNumberLabel")}</FormLabel>
                <FormControl>
                  <Input placeholder="0912345678" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 size-4 animate-spin" />}
            {t("profile.save")}
          </Button>
        </div>
      </form>
    </Form>
  );
}
