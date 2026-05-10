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

export type AppRole = "User" | "Mentor" | "Admin";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  /** If true, only mark active on exact path match (no prefix matching). */
  exact?: boolean;
}

export const userNavItems: NavItem[] = [
  { label: "Dashboard", href: "/user", icon: LayoutDashboard, exact: true },
  { label: "Find Mentors", href: "/user/mentors", icon: Users },
  { label: "My Bookings", href: "/user/bookings", icon: CalendarCheck },
  { label: "AI Assistant", href: "/user/ai-chat", icon: Bot },
  { label: "Payments", href: "/user/payments", icon: CreditCard },
  { label: "Profile", href: "/user/profile", icon: UserCircle },
];

export const mentorNavItems: NavItem[] = [
  { label: "Dashboard", href: "/mentor", icon: LayoutDashboard, exact: true },
  { label: "My Schedule", href: "/mentor/schedule", icon: CalendarDays },
  { label: "My Skills", href: "/mentor/skills", icon: GraduationCap },
  { label: "Bookings", href: "/mentor/bookings", icon: BookOpen },
  { label: "AI Assistant", href: "/mentor/ai-chat", icon: Bot },
  { label: "Profile", href: "/mentor/profile", icon: UserCircle },
];

export const adminNavItems: NavItem[] = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard, exact: true },
  { label: "Mentors", href: "/admin/mentors", icon: Users },
  { label: "Bookings", href: "/admin/bookings", icon: CalendarCheck },
  { label: "Payments", href: "/admin/payments", icon: CreditCard },
  { label: "System Health", href: "/admin/health", icon: Activity },
];
