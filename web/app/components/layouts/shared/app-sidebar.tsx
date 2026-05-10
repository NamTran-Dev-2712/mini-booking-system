import { CalendarDays, LogOut } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "sonner";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import { getApiErrorMessage } from "~/lib/api-error";
import { cn } from "~/lib/utils";
import { authService } from "~/services/auth/auth.service";
import { useAuthStore } from "~/stores/auth.store";
import type { NavItem } from "./nav-config";

interface AppSidebarProps {
  navItems: NavItem[];
  /** Called after a nav link is clicked — used by mobile sheet to close itself. */
  onNavigate?: () => void;
}

export function AppSidebar({ navItems, onNavigate }: AppSidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, clearUser } = useAuthStore();

  const initials = (user?.fullName ?? "?")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  async function handleLogout() {
    try {
      await authService.logout();
    } catch {
      // Even if logout fails on BE, clear client state so user is not stuck
    } finally {
      clearUser();
      navigate("/login");
    }
  }

  function isActive(item: NavItem) {
    if (item.exact) return location.pathname === item.href;
    return (
      location.pathname === item.href ||
      location.pathname.startsWith(item.href + "/")
    );
  }

  return (
    <div className="flex h-full w-[260px] flex-col border-r bg-background">
      {/* Brand */}
      <div className="flex h-16 shrink-0 items-center gap-3 px-5">
        <div className="flex size-8 items-center justify-center rounded-lg bg-primary">
          <CalendarDays className="size-4 text-primary-foreground" />
        </div>
        <span className="text-base font-semibold tracking-tight">
          MiniBooking
        </span>
      </div>

      <Separator />

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <ul className="space-y-0.5">
          {navItems.map((item) => {
            const active = isActive(item);
            return (
              <li key={item.href}>
                <Link
                  to={item.href}
                  onClick={onNavigate}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    active
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                  )}
                >
                  <item.icon
                    className={cn(
                      "size-[18px] shrink-0",
                      active ? "text-primary" : "text-muted-foreground",
                    )}
                  />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <Separator />

      {/* User footer */}
      <div className="flex items-center gap-3 p-4">
        <Avatar className="size-9 shrink-0">
          <AvatarFallback className="bg-primary/10 text-sm font-semibold text-primary">
            {initials}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium leading-tight">
            {user?.fullName}
          </p>
          <p className="truncate text-xs text-muted-foreground">
            {user?.email}
          </p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleLogout}
          aria-label="Logout"
          className="shrink-0 text-muted-foreground hover:text-destructive"
        >
          <LogOut className="size-4" />
        </Button>
      </div>
    </div>
  );
}
