import { Link } from "react-router";
import {
  CalendarCheck,
  Shield,
  Zap,
  Search,
  CheckCircle2,
  ChevronRight,
  Users,
  Building2,
  BarChart3,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { Separator } from "~/components/ui/separator";

export function meta() {
  return [
    { title: "MiniBooking — Smart Mentor Scheduling" },
    {
      name: "description",
      content: "Connect with mentors and book appointments effortlessly",
    },
  ];
}

export default function HomePage() {
  const { t } = useTranslation("public");

  const features = [
    {
      icon: CalendarCheck,
      title: t("features.instantBooking.title"),
      description: t("features.instantBooking.description"),
    },
    {
      icon: Shield,
      title: t("features.securePrivate.title"),
      description: t("features.securePrivate.description"),
    },
    {
      icon: Zap,
      title: t("features.fastEasy.title"),
      description: t("features.fastEasy.description"),
    },
  ];

  const stats = [
    { icon: Users, value: "1,000+", label: t("stats.students") },
    { icon: Building2, value: "200+", label: t("stats.mentors") },
    { icon: BarChart3, value: "50K+", label: t("stats.sessions") },
  ];

  const steps = [
    {
      step: "01",
      title: t("howItWorks.search.title"),
      description: t("howItWorks.search.description"),
    },
    {
      step: "02",
      title: t("howItWorks.book.title"),
      description: t("howItWorks.book.description"),
    },
    {
      step: "03",
      title: t("howItWorks.connect.title"),
      description: t("howItWorks.connect.description"),
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,oklch(0.9_0_0/0.3),transparent)]" />
        <div className="container mx-auto max-w-6xl px-4 text-center">
          <Badge
            variant="secondary"
            className="mb-4 inline-flex items-center gap-1"
          >
            <CheckCircle2 className="size-3" />
            {t("hero.badge")}
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
            {t("hero.title")}
            <span className="block text-muted-foreground">
              {t("hero.titleHighlight")}
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base text-muted-foreground md:text-lg">
            {t("hero.description")}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button size="lg" asChild className="h-11 px-6">
              <Link to="/register">
                {t("hero.getStarted")}
                <ChevronRight className="ml-1 size-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild className="h-11 px-6">
              <Link to="/about">{t("hero.learnMore")}</Link>
            </Button>
          </div>
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

      {/* Features */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              {t("features.title")}
            </h2>
            <p className="mt-3 text-muted-foreground">
              {t("features.subtitle")}
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {features.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="group rounded-xl border border-border/60 bg-card p-6 transition-shadow hover:shadow-md"
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

      {/* How it works */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              {t("howItWorks.title")}
            </h2>
            <p className="mt-3 text-muted-foreground">
              {t("howItWorks.subtitle")}
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {steps.map(({ step, title, description }) => (
              <div key={step} className="relative flex flex-col gap-3">
                <span className="text-5xl font-black text-border select-none">
                  {step}
                </span>
                <div className="flex items-center gap-2">
                  <Search className="size-4 opacity-60" />
                  <h3 className="font-semibold">{title}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-foreground text-background py-16 md:py-20">
        <div className="container mx-auto max-w-6xl px-4 text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            {t("cta.title")}
          </h2>
          <p className="mt-3 text-background/60 md:text-lg">
            {t("cta.subtitle")}
          </p>
          <Button
            size="lg"
            variant="secondary"
            asChild
            className="mt-8 h-11 px-8"
          >
            <Link to="/register">
              {t("cta.button")}
              <ChevronRight className="ml-1 size-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
