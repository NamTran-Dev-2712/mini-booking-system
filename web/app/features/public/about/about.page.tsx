import {
  Target,
  Heart,
  Lightbulb,
  Users,
  Building2,
  BarChart3,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import { Badge } from "~/components/ui/badge";
import { Separator } from "~/components/ui/separator";

export function meta() {
  return [
    { title: "About Us — MiniBooking" },
    { name: "description", content: "Our story and mission at MiniBooking" },
  ];
}

const team = [
  { name: "Trần Nam", role: "Founder & CEO", initials: "TN" },
  { name: "Nguyễn Linh", role: "Lead Designer", initials: "NL" },
  { name: "Phạm Khoa", role: "Backend Engineer", initials: "PK" },
  { name: "Lê Thu", role: "Frontend Engineer", initials: "LT" },
];

export default function AboutPage() {
  const { t } = useTranslation("public");

  const stats = [
    { icon: Users, value: "1,000+", label: t("about.stats.trustedStudents") },
    { icon: Building2, value: "200+", label: t("about.stats.expertMentors") },
    {
      icon: BarChart3,
      value: "50K+",
      label: t("about.stats.successfulSessions"),
    },
  ];

  const values = [
    {
      icon: Target,
      title: t("about.values.simplicity.title"),
      description: t("about.values.simplicity.description"),
    },
    {
      icon: Heart,
      title: t("about.values.dedication.title"),
      description: t("about.values.dedication.description"),
    },
    {
      icon: Lightbulb,
      title: t("about.values.innovation.title"),
      description: t("about.values.innovation.description"),
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden py-20 md:py-28">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,oklch(0.9_0_0/0.25),transparent)]" />
        <div className="container mx-auto max-w-6xl px-4 text-center">
          <Badge variant="secondary" className="mb-4">
            {t("about.badge")}
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            {t("about.title")}
            <span className="block text-muted-foreground">
              {t("about.titleHighlight")}
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground md:text-lg">
            {t("about.description")}
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border/60 bg-muted/30 py-10">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-3 gap-4 md:gap-8">
            {stats.map(({ icon: Icon, value, label }) => (
              <div
                key={label}
                className="flex flex-col items-center gap-1 text-center"
              >
                <Icon className="size-5 text-muted-foreground mb-1" />
                <span className="text-2xl font-bold md:text-3xl">{value}</span>
                <span className="text-xs text-muted-foreground md:text-sm">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <div className="space-y-4">
              <Badge variant="secondary">{t("about.mission.badge")}</Badge>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                {t("about.mission.title")}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {t("about.mission.p1")}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                {t("about.mission.p2")}
              </p>
            </div>
            <div className="rounded-2xl border border-border/60 bg-muted/40 aspect-video flex items-center justify-center">
              <p className="text-muted-foreground text-sm">
                {t("about.mission.screenshot")}
              </p>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      {/* Values */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              {t("about.values.title")}
            </h2>
            <p className="mt-3 text-muted-foreground">
              {t("about.values.subtitle")}
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {values.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="rounded-xl border border-border/60 bg-card p-6 transition-shadow hover:shadow-md"
              >
                <div className="mb-4 inline-flex size-10 items-center justify-center rounded-lg bg-muted">
                  <Icon className="size-5" />
                </div>
                <h3 className="font-semibold">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Separator />

      {/* Team */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              {t("about.team.title")}
            </h2>
            <p className="mt-3 text-muted-foreground">
              {t("about.team.subtitle")}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {team.map(({ name, role, initials }) => (
              <div
                key={name}
                className="flex flex-col items-center gap-3 text-center"
              >
                <Avatar className="size-16">
                  <AvatarFallback className="text-sm font-medium">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-sm">{name}</p>
                  <p className="text-xs text-muted-foreground">{role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
