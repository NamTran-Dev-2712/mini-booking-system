import { useCurrentUser } from "~/hooks/use-auth";

export function meta() {
  return [{ title: "Dashboard — MiniBooking" }];
}

export default function UserDashboard() {
  const user = useCurrentUser();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">
          Welcome back, {user?.fullName} 👋
        </h2>
        <p className="text-muted-foreground">
          Here's what's happening with your sessions.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { label: "Upcoming Bookings", value: "—" },
          { label: "Sessions Completed", value: "—" },
          { label: "Active Mentors", value: "—" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border bg-card p-6 shadow-sm"
          >
            <p className="text-sm text-muted-foreground">{stat.label}</p>
            <p className="mt-1 text-3xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
