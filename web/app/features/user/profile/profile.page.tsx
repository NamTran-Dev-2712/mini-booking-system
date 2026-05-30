import { Mail, Phone } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";
import { ChangePasswordForm } from "~/features/auth/change-password/change-password.form";
import { UserProfileForm } from "~/features/user/profile/profile.form";
import { useProfileQuery } from "~/hooks/auth/use-profile-query";
import { useCurrentUser } from "~/hooks/use-auth";

export function meta() {
  return [{ title: "Profile — MiniBooking" }];
}

export default function UserProfile() {
  const { t } = useTranslation("auth");
  const user = useCurrentUser();
  const { data: profile } = useProfileQuery();

  const initials = (user?.fullName ?? "?")
    .split(" ")
    .filter(Boolean)
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">
          {t("profile.title")}
        </h2>
        <p className="text-muted-foreground">{t("profile.manageAccount")}</p>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
            <Avatar className="size-16 ring-2 ring-border ring-offset-2 ring-offset-background">
              <AvatarImage
                src={(profile as any)?.avatarUrl ?? undefined}
                alt={user?.fullName}
              />
              <AvatarFallback className="text-lg font-semibold">
                {initials}
              </AvatarFallback>
            </Avatar>

            <div className="min-w-0 flex-1 text-center sm:text-left">
              <h3 className="text-xl font-semibold">{user?.fullName}</h3>
              <div className="mt-2 flex flex-wrap items-center justify-center gap-4 text-sm sm:justify-start">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Mail className="size-3.5" />
                  <span>{user?.email}</span>
                </div>
                {user?.phoneNumber && (
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Phone className="size-3.5" />
                    <span>{user.phoneNumber}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-base">
            {t("profile.editProfile")}
          </CardTitle>
        </CardHeader>
        <Separator />
        <CardContent className="pt-6">
          <UserProfileForm />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-base">
            {t("profile.changePassword")}
          </CardTitle>
        </CardHeader>
        <Separator />
        <CardContent className="pt-6">
          <ChangePasswordForm />
        </CardContent>
      </Card>
    </div>
  );
}
