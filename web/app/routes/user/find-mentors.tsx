import { useTranslation } from "react-i18next";
import { MentorListContainer } from "~/components/shared/mentor/mentor-list-container";

export function meta() {
  return [{ title: "Find Mentors — MiniBooking" }];
}

export default function UserFindMentors() {
  const { t } = useTranslation("mentor");

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">
          {t("list.title")}
        </h2>
        <p className="text-muted-foreground">{t("list.subtitle")}</p>
      </div>

      <MentorListContainer detailBasePath="/user/mentors" defaultPageSize={9} />
    </div>
  );
}
