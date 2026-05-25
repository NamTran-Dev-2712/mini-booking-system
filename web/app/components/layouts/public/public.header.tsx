import { Link, NavLink, useNavigate } from "react-router";
import {
  CalendarDays,
  LayoutDashboard,
  LogOut,
  Menu,
  UserCircle,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";
import { Separator } from "~/components/ui/separator";
import { authService } from "~/services/auth/auth.service";
import { useAuthStore } from "~/stores/auth.store";
import { useCurrentUser, usePrimaryRole } from "~/hooks/use-auth";
import { LanguageSwitcher } from "~/components/shared/language-switcher";

const ROLE_DASHBOARD: Record<string, string> = {
  Admin: "/admin",
  Mentor: "/mentor",
  User: "/user",
};

export default function PublicHeader() {
  const { t } = useTranslation("common");
  const navigate = useNavigate();
  const user = useCurrentUser();
  const primaryRole = usePrimaryRole();
  const clearUser = useAuthStore((s) => s.clearUser);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  const dashboardHref = ROLE_DASHBOARD[primaryRole ?? ""] ?? "/";
  const initials = (user?.fullName ?? "?")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const navLinks = [
    { to: "/", label: t("nav.home") },
    { to: "/about", label: t("nav.about") },
    { to: "/mentors", label: t("nav.mentors") },
  ];

  async function handleLogout() {
    try {
      await authService.logout();
    } catch {
      // clear client state regardless
    } finally {
      clearUser();
      navigate("/login");
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/95 backdrop-blur-sm">
      <div className="container mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 font-semibold text-base transition-opacity hover:opacity-80"
        >
          <CalendarDays className="size-5" />
          <span>MiniBooking</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                `px-3 py-1.5 text-sm rounded-md transition-colors ${
                  isActive
                    ? "text-foreground font-medium bg-muted"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-2">
          <LanguageSwitcher />
          {isAuthenticated ? (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link to={dashboardHref} className="flex items-center gap-1.5">
                  <LayoutDashboard className="size-3.5" />
                  {t("actions.goToDashboard")}
                </Link>
              </Button>

              <div className="flex items-center gap-2 pl-1">
                <Avatar className="size-8">
                  <AvatarFallback className="bg-primary/10 text-xs font-semibold text-primary">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium leading-tight max-w-[120px] truncate">
                  {user?.fullName}
                </span>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="text-muted-foreground hover:text-destructive"
              >
                <LogOut className="size-3.5" />
                {t("actions.signOut")}
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/login">{t("actions.signIn")}</Link>
              </Button>
              <Button size="sm" asChild>
                <Link to="/register">{t("actions.signUp")}</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile menu */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72">
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2 text-base">
                <CalendarDays className="size-4" />
                MiniBooking
              </SheetTitle>
            </SheetHeader>
            <div className="mt-6 flex flex-col gap-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === "/"}
                  className={({ isActive }) =>
                    `px-3 py-2 text-sm rounded-md transition-colors ${
                      isActive
                        ? "text-foreground font-medium bg-muted"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>

            <Separator className="my-4" />

            <div className="flex items-center justify-between px-3 py-2">
              <span className="text-sm text-muted-foreground">
                {t("language.label")}
              </span>
              <LanguageSwitcher />
            </div>

            <Separator className="my-4" />

            {isAuthenticated ? (
              <div className="flex flex-col gap-2 px-1">
                <div className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2.5">
                  <Avatar className="size-8 shrink-0">
                    <AvatarFallback className="bg-primary/10 text-xs font-semibold text-primary">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">
                      {user?.fullName}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      {user?.email}
                    </p>
                  </div>
                </div>

                <Button variant="outline" asChild>
                  <Link to={dashboardHref} className="flex items-center gap-2">
                    <LayoutDashboard className="size-4" />
                    {t("actions.goToDashboard")}
                  </Link>
                </Button>

                <Button asChild variant="ghost">
                  <Link
                    to={`/${primaryRole?.toLowerCase()}/profile`}
                    className="flex items-center gap-2"
                  >
                    <UserCircle className="size-4" />
                    {t("actions.myProfile")}
                  </Link>
                </Button>

                <Button
                  variant="ghost"
                  onClick={handleLogout}
                  className="justify-start text-muted-foreground hover:text-destructive"
                >
                  <LogOut className="size-4" />
                  {t("actions.signOut")}
                </Button>
              </div>
            ) : (
              <div className="flex flex-col gap-2 px-1">
                <Button variant="outline" asChild>
                  <Link to="/login">{t("actions.signIn")}</Link>
                </Button>
                <Button asChild>
                  <Link to="/register">{t("actions.signUp")}</Link>
                </Button>
              </div>
            )}
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
