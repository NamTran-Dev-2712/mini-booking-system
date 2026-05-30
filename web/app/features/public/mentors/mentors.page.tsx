import { useTranslation } from "react-i18next";
import { MentorListContainer } from "~/components/shared/mentor/mentor-list-container";

export function meta() {
  return [
    { title: "Find Mentors — MiniBooking" },
    {
      name: "description",
      content:
        "Browse and connect with expert mentors. Filter by specialization, experience, and price.",
    },
  ];
}

export default function PublicMentors() {
  const { t } = useTranslation("mentor");

  return (
    <div className="container mx-auto space-y-8 px-4 py-10">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          {t("list.findAMentor")}
        </h1>
        <p className="text-lg text-muted-foreground">
          {t("list.browseSubtitle")}
        </p>
      </div>

      <MentorListContainer detailBasePath="/mentors" defaultPageSize={9} />
    </div>
  );
}
