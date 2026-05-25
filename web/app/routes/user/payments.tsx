import { CreditCard } from "lucide-react";
import { useTranslation } from "react-i18next";

export function meta() {
  return [{ title: "Payments — MiniBooking" }];
}

export default function UserPayments() {
  const { t } = useTranslation("payment");

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">
          {t("list.title")}
        </h2>
        <p className="text-muted-foreground">{t("list.subtitle")}</p>
      </div>

      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-16 text-center">
        <CreditCard className="mb-4 size-10 text-muted-foreground/50" />
        <p className="text-sm font-medium text-muted-foreground">
          {t("list.empty")}
        </p>
      </div>
    </div>
  );
}
