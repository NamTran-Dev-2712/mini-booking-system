import { Activity, CheckCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

export function meta() {
  return [{ title: "System Health — Admin | MiniBooking" }];
}

export default function AdminHealth() {
  const { t } = useTranslation("common");

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">
          {t("nav.systemHealth")}
        </h2>
        <p className="text-muted-foreground">
          Monitor API status and service health.
        </p>
      </div>

      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <Activity className="size-5 text-muted-foreground" />
          <span className="text-sm font-medium">API Status</span>
          <div className="ml-auto flex items-center gap-1.5 text-sm font-medium text-emerald-600">
            <CheckCircle className="size-4" />
            {t("status.operational")}
          </div>
        </div>
      </div>
    </div>
  );
}
