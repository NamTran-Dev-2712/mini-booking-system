import type { ReactNode } from "react";
import { AppHeader } from "./app-header";
import { AppSidebar } from "./app-sidebar";
import type { NavItem } from "./nav-config";

interface AppLayoutProps {
  navItems: NavItem[];
  children: ReactNode;
}

export function AppLayout({ navItems, children }: AppLayoutProps) {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Desktop sidebar — always visible on lg+ */}
      <aside className="hidden shrink-0 lg:flex">
        <AppSidebar navItems={navItems} />
      </aside>

      {/* Main area */}
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <AppHeader navItems={navItems} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
