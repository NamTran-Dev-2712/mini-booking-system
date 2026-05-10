import { UserCircle } from "lucide-react";
import { useCurrentUser } from "~/hooks/use-auth";

export function meta() {
  return [{ title: "Profile — MiniBooking" }];
}

export default function UserProfile() {
  const user = useCurrentUser();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Profile</h2>
        <p className="text-muted-foreground">
          Manage your personal information.
        </p>
      </div>

      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex size-16 items-center justify-center rounded-full bg-primary/10">
            <UserCircle className="size-8 text-primary" />
          </div>
          <div>
            <p className="text-lg font-semibold">{user?.fullName}</p>
            <p className="text-sm text-muted-foreground">{user?.email}</p>
            <p className="text-sm text-muted-foreground">{user?.phoneNumber}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
