import { Link } from "react-router";
import { CalendarDays } from "lucide-react";
import { useTranslation } from "react-i18next";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
}

export default function AuthLayout({
  children,
  title,
  description,
}: AuthLayoutProps) {
  const { t } = useTranslation("auth");
  const year = new Date().getFullYear();

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left - Brand panel */}
      <div className="hidden lg:flex flex-col justify-between bg-foreground text-background p-10">
        <Link to="/" className="flex items-center gap-2 font-semibold text-lg">
          <CalendarDays className="size-6" />
          <span>MiniBooking</span>
        </Link>

        <div className="space-y-4">
          <blockquote className="text-2xl font-medium leading-relaxed">
            “{t("layout.tagline")}”
          </blockquote>
          <p className="text-background/60 text-sm">{t("layout.trustedBy")}</p>
        </div>

        <p className="text-background/40 text-xs">
          {t("layout.copyright", { year })}
        </p>
      </div>

      {/* Right - Form panel */}
      <div className="flex flex-col items-center justify-center px-6 py-12 lg:px-10">
        {/* Mobile logo */}
        <Link
          to="/"
          className="flex items-center gap-2 font-semibold text-lg mb-8 lg:hidden"
        >
          <CalendarDays className="size-5" />
          <span>MiniBooking</span>
        </Link>

        <div className="w-full max-w-sm space-y-6">
          <div className="space-y-1 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}
