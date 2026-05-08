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

const features = [
  {
    icon: CalendarCheck,
    title: "Instant Booking",
    description:
      "Find available mentors and book sessions instantly — no waiting or phone calls needed.",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description:
      "End-to-end encrypted data. Your privacy and mentor information are protected.",
  },
  {
    icon: Zap,
    title: "Fast & Easy",
    description:
      "Intuitive interface. Just 3 simple steps to schedule your mentorship session.",
  },
];

const stats = [
  { icon: Users, value: "1,000+", label: "Students" },
  { icon: Building2, value: "200+", label: "Mentors" },
  { icon: BarChart3, value: "50K+", label: "Sessions" },
];

const steps = [
  {
    step: "01",
    title: "Search",
    description:
      "Browse mentors by expertise, experience level, and availability.",
  },
  {
    step: "02",
    title: "Book",
    description:
      "View real-time availability and select your preferred time slot.",
  },
  {
    step: "03",
    title: "Connect",
    description:
      "Receive instant confirmation and automatic reminders before your session.",
  },
];

export default function HomePage() {
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
            Free • No Installation Required
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
            Connect with Mentors
            <span className="block text-muted-foreground">
              Easier Than Ever
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base text-muted-foreground md:text-lg">
            MiniBooking helps you find expert mentors, schedule sessions, and
            grow your skills — all on one seamless platform.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button size="lg" asChild className="h-11 px-6">
              <Link to="/register">
                Get Started Free
                <ChevronRight className="ml-1 size-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild className="h-11 px-6">
              <Link to="/about">Learn More</Link>
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
              Why Choose MiniBooking?
            </h2>
            <p className="mt-3 text-muted-foreground">
              Built for simplicity, powerful enough for all your mentorship
              needs.
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
              Just 3 Simple Steps
            </h2>
            <p className="mt-3 text-muted-foreground">
              From search to confirmation — faster than you think.
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
            Ready to Get Started?
          </h2>
          <p className="mt-3 text-background/60 md:text-lg">
            Join thousands of students connecting with expert mentors every day.
          </p>
          <Button
            size="lg"
            variant="secondary"
            asChild
            className="mt-8 h-11 px-8"
          >
            <Link to="/register">
              Create Free Account
              <ChevronRight className="ml-1 size-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
