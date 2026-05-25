import { format } from "date-fns";
import { useTranslation } from "react-i18next";
import type { MentorDetail } from "~/types/mentor/mentor";

interface MentorProfileTabProps {
  mentor: MentorDetail;
}

function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-4">
      <span className="w-36 shrink-0 text-xs font-medium text-muted-foreground">
        {label}
      </span>
      <span className="text-sm">{value ?? "—"}</span>
    </div>
  );
}

export function MentorProfileTab({ mentor }: MentorProfileTabProps) {
  const { t } = useTranslation("mentor");

  return (
    <div className="space-y-6">
      {/* Basic info */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium">{t("profileTab.basicInfo")}</h3>
        <div className="space-y-2.5 rounded-lg border p-4">
          <InfoRow
            label={t("profileTab.displayName")}
            value={mentor.displayName}
          />
          <InfoRow label={t("profileTab.email")} value={mentor.email} />
          <InfoRow
            label={t("profileTab.specialization")}
            value={mentor.specialization}
          />
          <InfoRow
            label={t("profileTab.experience")}
            value={`${mentor.experienceYears} ${t("detail.experienceYears", { count: mentor.experienceYears })}`}
          />
          <InfoRow
            label={t("profileTab.basePrice")}
            value={new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
              maximumFractionDigits: 0,
            }).format(mentor.basePrice)}
          />
          <InfoRow
            label={t("profileTab.status")}
            value={
              mentor.isActive
                ? t("profileTab.active")
                : t("profileTab.inactive")
            }
          />
          <InfoRow
            label={t("profileTab.memberSince")}
            value={format(new Date(mentor.createdAt), "dd MMMM yyyy")}
          />
        </div>
      </div>

      {/* Bio */}
      {mentor.bio && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium">{t("profileTab.bio")}</h3>
          <p className="rounded-lg border p-4 text-sm leading-relaxed text-muted-foreground">
            {mentor.bio}
          </p>
        </div>
      )}
    </div>
  );
}
