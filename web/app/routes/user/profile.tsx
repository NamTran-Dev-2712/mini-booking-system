import { UserCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";
import { UserProfileForm } from "~/features/user/profile/profile.form";
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

      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="flex size-12 items-center justify-center rounded-full bg-primary/10">
              <UserCircle className="size-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-base">{user?.fullName}</CardTitle>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
            </div>
          </div>
        </CardHeader>
        <Separator />
        <CardContent className="pt-6">
          <UserProfileForm />
        </CardContent>
      </Card>
    </div>
  );
}
