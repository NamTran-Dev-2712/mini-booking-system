import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  // ── Public ─────────────────────────────────────────────────────────────────
  layout("routes/public/_layout.tsx", [
    index("routes/public/home.tsx"),
    route("about", "routes/public/about.tsx"),
    route("mentors", "routes/public/mentors.tsx"),
    route("mentors/:id", "routes/public/mentor-detail.tsx"),
  ]),

  // ── Auth ───────────────────────────────────────────────────────────────────
  layout("routes/auth/_layout.tsx", [
    route("login", "routes/auth/login.tsx"),
    route("register", "routes/auth/register.tsx"),
    route("forgot-password", "routes/auth/forgot-password.tsx"),
    route("reset-password", "routes/auth/reset-password.tsx"),
  ]),

  // ── User (role: User) ──────────────────────────────────────────────────────
  layout("routes/user/_layout.tsx", [
    route("user", "routes/user/dashboard.tsx"),
    route("user/bookings", "routes/user/bookings.tsx"),
    route("user/bookings/:id", "routes/user/booking-detail.tsx"),
    route("user/bookings/:id/payment", "routes/user/booking-payment.tsx"),
    route("user/mentors", "routes/user/find-mentors.tsx"),
    route("user/mentors/:id", "routes/user/mentor-detail.tsx"),
    route("user/ai-chat", "routes/user/ai-chat.tsx"),
    route("user/payments", "routes/user/payments.tsx"),
    route("user/profile", "routes/user/profile.tsx"),
  ]),

  // ── Mentor (role: Mentor) ─────────────────────────────────────────────────
  layout("routes/mentor/_layout.tsx", [
    route("mentor", "routes/mentor/dashboard.tsx"),
    route("mentor/schedule", "routes/mentor/schedule.tsx"),
    route("mentor/skills", "routes/mentor/skills.tsx"),
    route("mentor/bookings", "routes/mentor/bookings.tsx"),
    route("mentor/ai-chat", "routes/mentor/ai-chat.tsx"),
    route("mentor/profile", "routes/mentor/profile.tsx"),
  ]),

  // ── Admin (role: Admin) ───────────────────────────────────────────────────
  layout("routes/admin/_layout.tsx", [
    route("admin", "routes/admin/dashboard.tsx"),
    route("admin/mentors", "routes/admin/mentors.tsx"),
    route("admin/mentors/:id", "routes/admin/mentors.$id.tsx"),
    route("admin/bookings", "routes/admin/bookings.tsx"),
    route("admin/payments", "routes/admin/payments.tsx"),
    route("admin/health", "routes/admin/health.tsx"),
    route("admin/profile", "routes/admin/profile.tsx"),
  ]),

  // ── Error pages ────────────────────────────────────────────────────────────
  route("unauthorized", "routes/errors/unauthorized.tsx"),
] satisfies RouteConfig;
