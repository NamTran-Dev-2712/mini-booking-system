import {
  Target,
  Heart,
  Lightbulb,
  Users,
  Building2,
  BarChart3,
} from "lucide-react";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import { Badge } from "~/components/ui/badge";
import { Separator } from "~/components/ui/separator";

export function meta() {
  return [
    { title: "About Us — MiniBooking" },
    { name: "description", content: "Our story and mission at MiniBooking" },
  ];
}

const stats = [
  { icon: Users, value: "1,000+", label: "Trusted Students" },
  { icon: Building2, value: "200+", label: "Expert Mentors" },
  { icon: BarChart3, value: "50K+", label: "Successful Sessions" },
];

const values = [
  {
    icon: Target,
    title: "Simplicity",
    description:
      "We believe technology should serve people, not the other way around. Every feature is designed for maximum ease of use.",
  },
  {
    icon: Heart,
    title: "Dedication",
    description:
      "Every user feedback inspires us to improve. We listen, we learn, and we act on what matters most.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "Constantly seeking better ways to solve problems. Innovation is in our DNA and drives everything we build.",
  },
];

const team = [
  { name: "Trần Nam", role: "Founder & CEO", initials: "TN" },
  { name: "Nguyễn Linh", role: "Lead Designer", initials: "NL" },
  { name: "Phạm Khoa", role: "Backend Engineer", initials: "PK" },
  { name: "Lê Thu", role: "Frontend Engineer", initials: "LT" },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden py-20 md:py-28">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,oklch(0.9_0_0/0.25),transparent)]" />
        <div className="container mx-auto max-w-6xl px-4 text-center">
          <Badge variant="secondary" className="mb-4">
            About Us
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            Building the Future
            <span className="block text-muted-foreground">of Mentorship</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground md:text-lg">
            MiniBooking was founded with one goal: make connecting with mentors
            easy and effective for everyone, everywhere.
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
              <Badge variant="secondary">Our Mission</Badge>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                Connecting Students with Expert Mentors
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We believe mentorship is the key to growth. MiniBooking exists
                to remove the friction in scheduling mentorship sessions — so
                you can focus on learning and developing your skills.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Whether you're a student seeking guidance or a professional
                sharing knowledge, our platform adapts to your needs without
                requiring any technical expertise.
              </p>
            </div>
            <div className="rounded-2xl border border-border/60 bg-muted/40 aspect-video flex items-center justify-center">
              <p className="text-muted-foreground text-sm">
                Product screenshot
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
              Our Core Values
            </h2>
            <p className="mt-3 text-muted-foreground">
              The principles that guide every decision we make.
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
              Our Team
            </h2>
            <p className="mt-3 text-muted-foreground">
              The people behind MiniBooking.
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
