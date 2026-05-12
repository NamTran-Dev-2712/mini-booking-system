import { CalendarDays, Menu } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router";
import { Button } from "~/components/ui/button";
import { Sheet, SheetContent } from "~/components/ui/sheet";
import { AppSidebar } from "./app-sidebar";
import type { NavItem } from "./nav-config";

interface AppHeaderProps {
  navItems: NavItem[];
}

export function AppHeader({ navItems }: AppHeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  // Derive page title from the active nav item
  const activeItem = navItems.find((item) => {
    if (item.exact) return location.pathname === item.href;
    return (
      location.pathname === item.href ||
      location.pathname.startsWith(item.href + "/")
    );
  });

  return (
    <header className="flex h-16 shrink-0 items-center gap-3 border-b bg-background px-4 lg:px-6">
      {/* Mobile: hamburger trigger */}
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden"
        onClick={() => setMobileOpen(true)}
        aria-label="Open menu"
      >
        <Menu className="size-5" />
      </Button>

      {/* Mobile: brand name */}
      <Link to="/" className="flex items-center gap-2 font-semibold lg:hidden">
        <div className="flex size-7 items-center justify-center rounded-md bg-primary">
          <CalendarDays className="size-3.5 text-primary-foreground" />
        </div>
        <span className="text-sm">MiniBooking</span>
      </Link>

      {/* Desktop: current page title */}
      {activeItem && (
        <h1 className="hidden text-sm font-semibold text-foreground lg:block">
          {activeItem.label}
        </h1>
      )}

      {/* Mobile sidebar via Sheet */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent
          side="left"
          className="w-[260px] p-0 gap-0"
          showCloseButton={false}
        >
          <AppSidebar
            navItems={navItems}
            onNavigate={() => setMobileOpen(false)}
          />
        </SheetContent>
      </Sheet>
    </header>
  );
}
