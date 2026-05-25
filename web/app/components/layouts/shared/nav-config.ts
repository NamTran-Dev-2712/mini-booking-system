import {
  Activity,
  BookOpen,
  Bot,
  CalendarCheck,
  CalendarDays,
  CreditCard,
  GraduationCap,
  LayoutDashboard,
  type LucideIcon,
  UserCircle,
  Users,
} from "lucide-react";
import { featureFlags } from "~/config/feature-flags";

export type AppRole = "User" | "Mentor" | "Admin";

export interface NavItem {
  label: string;
  labelKey: string;
  href: string;
  icon: LucideIcon;
  /** If true, only mark active on exact path match (no prefix matching). */
  exact?: boolean;
}

export const userNavItems: NavItem[] = [
  {
    label: "Dashboard",
    labelKey: "nav.dashboard",
    href: "/user",
    icon: LayoutDashboard,
    exact: true,
  },
  {
    label: "Find Mentors",
    labelKey: "nav.findMentors",
    href: "/user/mentors",
    icon: Users,
  },
  {
    label: "My Bookings",
    labelKey: "nav.myBookings",
    href: "/user/bookings",
    icon: CalendarCheck,
  },
  {
    label: "AI Assistant",
    labelKey: "nav.aiAssistant",
    href: "/user/ai-chat",
    icon: Bot,
  },
  {
    label: "Payments",
    labelKey: "nav.payments",
    href: "/user/payments",
    icon: CreditCard,
  },
  {
    label: "Profile",
    labelKey: "nav.profile",
    href: "/user/profile",
    icon: UserCircle,
  },
];

export const mentorNavItems: NavItem[] = [
  {
    label: "Dashboard",
    labelKey: "nav.dashboard",
    href: "/mentor",
    icon: LayoutDashboard,
    exact: true,
  },
  {
    label: "My Schedule",
    labelKey: "nav.mySchedule",
    href: "/mentor/schedule",
    icon: CalendarDays,
  },
  {
    label: "My Skills",
    labelKey: "nav.mySkills",
    href: "/mentor/skills",
    icon: GraduationCap,
  },
  {
    label: "Bookings",
    labelKey: "nav.bookings",
    href: "/mentor/bookings",
    icon: BookOpen,
  },
  {
    label: "AI Assistant",
    labelKey: "nav.aiAssistant",
    href: "/mentor/ai-chat",
    icon: Bot,
  },
  {
    label: "Profile",
    labelKey: "nav.profile",
    href: "/mentor/profile",
    icon: UserCircle,
  },
];

export const adminNavItems: NavItem[] = [
  {
    label: "Dashboard",
    labelKey: "nav.dashboard",
    href: "/admin",
    icon: LayoutDashboard,
    exact: true,
  },
  {
    label: "Mentors",
    labelKey: "nav.mentors",
    href: "/admin/mentors",
    icon: Users,
  },
  {
    label: "Bookings",
    labelKey: "nav.bookings",
    href: "/admin/bookings",
    icon: CalendarCheck,
  },
  {
    label: "Payments",
    labelKey: "nav.payments",
    href: "/admin/payments",
    icon: CreditCard,
  },
  {
    label: "System Health",
    labelKey: "nav.systemHealth",
    href: "/admin/health",
    icon: Activity,
  },
  {
    label: "Profile",
    labelKey: "nav.profile",
    href: "/admin/profile",
    icon: UserCircle,
  },
];

export function getVisibleNavItems(items: NavItem[]): NavItem[] {
  return items.filter((item) => {
    if (item.href.includes("/ai-chat")) return featureFlags.aiChat;
    return true;
  });
}
