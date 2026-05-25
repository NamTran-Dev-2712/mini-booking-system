import { CalendarCheck } from "lucide-react";
import { useTranslation } from "react-i18next";

export function meta() {
  return [{ title: "Bookings — Admin | MiniBooking" }];
}

export default function AdminBookings() {
  const { t } = useTranslation("booking");

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">
          {t("list.adminTitle")}
        </h2>
        <p className="text-muted-foreground">{t("list.adminSubtitle")}</p>
      </div>

      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-16 text-center">
        <CalendarCheck className="mb-4 size-10 text-muted-foreground/50" />
        <p className="text-sm font-medium text-muted-foreground">
          {t("list.comingSoon")}
        </p>
      </div>
    </div>
  );
}
