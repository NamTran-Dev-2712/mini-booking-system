import { Loader2, Mail } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
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
import { useForgotPasswordForm } from "./forgot-password.hook";

export function ForgotPasswordForm() {
  const { t } = useTranslation("auth");
  const { form, onSubmit, isSubmitted } = useForgotPasswordForm();
  const isSubmitting = form.formState.isSubmitting;

  if (isSubmitted) {
    return (
      <div className="space-y-6 text-center">
        <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-primary/10">
          <Mail className="size-6 text-primary" />
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-medium">
            {t("forgotPassword.checkEmail")}
          </h3>
          <p className="text-sm text-muted-foreground">
            {t("forgotPassword.checkEmailDescription")}
          </p>
        </div>
        <p className="text-center text-sm text-muted-foreground">
          {t("forgotPassword.didntReceive")}{" "}
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="font-medium text-foreground underline-offset-4 hover:underline"
          >
            {t("forgotPassword.tryAgain")}
          </button>
        </p>
        <p className="text-center text-sm text-muted-foreground">
          <Link
            to="/login"
            className="font-medium text-foreground underline-offset-4 hover:underline"
          >
            {t("forgotPassword.backToLogin")}
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={onSubmit} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("forgotPassword.email")}</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 size-4 animate-spin" />}
            {t("forgotPassword.submit")}
          </Button>
        </form>
      </Form>

      <p className="text-center text-sm text-muted-foreground">
        {t("forgotPassword.rememberPassword")}{" "}
        <Link
          to="/login"
          className="font-medium text-foreground underline-offset-4 hover:underline"
        >
          {t("forgotPassword.backToLogin")}
        </Link>
      </p>
    </div>
  );
}
