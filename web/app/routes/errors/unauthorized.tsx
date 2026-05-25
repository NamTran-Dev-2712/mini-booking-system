import { ShieldX } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { Button } from "~/components/ui/button";

export function meta() {
  return [{ title: "Unauthorized — MiniBooking" }];
}

export default function UnauthorizedPage() {
  const { t } = useTranslation("common");

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-6 text-center">
        <div className="flex justify-center">
          <div className="flex size-20 items-center justify-center rounded-full bg-destructive/10">
            <ShieldX className="size-10 text-destructive" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">
            Access Denied
          </h1>
          <p className="text-muted-foreground">{t("errors.unauthorized")}</p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
          <Button asChild variant="default">
            <Link to="/">{t("actions.goHome")}</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/login">{t("actions.signIn")}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
