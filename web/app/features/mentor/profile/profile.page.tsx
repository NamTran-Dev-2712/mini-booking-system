import {
  Briefcase,
  CalendarDays,
  DollarSign,
  GraduationCap,
  Mail,
  Phone,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Badge } from "~/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";
import { Skeleton } from "~/components/ui/skeleton";
import { ChangePasswordForm } from "~/features/auth/change-password/change-password.form";
import { MentorProfileForm } from "~/features/mentor/profile/profile.form";
import { useMyMentorProfile } from "~/hooks/mentor/use-my-mentor-profile";
import { useCurrentUser } from "~/hooks/use-auth";

export function meta() {
  return [{ title: "Profile — MiniBooking" }];
}

function formatPrice(price: number) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(price);
}

export default function MentorProfile() {
  const { t } = useTranslation(["mentor", "auth"]);
  const user = useCurrentUser();
  const { mentor, isPending } = useMyMentorProfile();

  if (isPending) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <div className="flex items-center gap-4">
          <Skeleton className="size-20 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
        <Skeleton className="h-48 w-full" />
      </div>
    );
  }

  const initials = (mentor?.displayName ?? user?.fullName ?? "?")
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
          {t("mentor:profile.yourProfile")}
        </h2>
        <p className="text-muted-foreground">
          {t("mentor:profile.yourProfileSubtitle")}
        </p>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
            <div className="relative shrink-0">
              <Avatar className="size-20 ring-2 ring-border ring-offset-2 ring-offset-background">
                <AvatarImage
                  src={mentor?.avatarUrl ?? undefined}
                  alt={mentor?.displayName}
                />
                <AvatarFallback className="text-lg font-semibold">
                  {initials}
                </AvatarFallback>
              </Avatar>
              {mentor?.isActive && (
                <span className="absolute bottom-1 right-1 size-3.5 rounded-full bg-green-500 ring-2 ring-background" />
              )}
            </div>

            <div className="min-w-0 flex-1 text-center sm:text-left">
              <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                <h3 className="text-xl font-semibold">
                  {mentor?.displayName ?? user?.fullName}
                </h3>
                <Badge variant={mentor?.isActive ? "default" : "secondary"}>
                  {mentor?.isActive
                    ? t("mentor:detail.active")
                    : t("mentor:detail.inactive")}
                </Badge>
              </div>

              {mentor?.specialization && (
                <p className="mt-1 text-sm text-muted-foreground">
                  {mentor.specialization}
                </p>
              )}

              <div className="mt-3 flex flex-wrap items-center justify-center gap-4 text-sm sm:justify-start">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Mail className="size-3.5" />
                  <span>{mentor?.email ?? user?.email}</span>
                </div>
                {(mentor?.phoneNumber || user?.phoneNumber) && (
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Phone className="size-3.5" />
                    <span>{mentor?.phoneNumber ?? user?.phoneNumber}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10">
              <Briefcase className="size-4 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">
                {t("mentor:profile.experience")}
              </p>
              <p className="text-lg font-semibold">
                {t("mentor:detail.experienceYears", {
                  count: mentor?.experienceYears ?? 0,
                })}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10">
              <DollarSign className="size-4 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">
                {t("mentor:profile.basePriceLabel")}
              </p>
              <p className="text-lg font-semibold">
                {formatPrice(mentor?.basePrice ?? 0)}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10">
              <CalendarDays className="size-4 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">
                {t("mentor:profile.totalSlots")}
              </p>
              <p className="text-lg font-semibold">
                {mentor?.slots.length ?? 0}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {mentor?.bio && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">
              {t("mentor:detail.about")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
              {mentor.bio}
            </p>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <GraduationCap className="size-4" />
            {t("mentor:detail.skills")}
            <span className="text-xs font-normal text-muted-foreground">
              ({mentor?.skills.length ?? 0})
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {(mentor?.skills.length ?? 0) === 0 ? (
            <p className="text-sm text-muted-foreground">
              {t("mentor:profile.noSkillsProfile")}
            </p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {mentor!.skills.map((skill) => (
                <Badge key={skill.id} variant="secondary" className="text-sm">
                  {skill.skillName}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-base">
            {t("mentor:profile.editProfile")}
          </CardTitle>
        </CardHeader>
        <Separator />
        <CardContent className="pt-6">
          <MentorProfileForm />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-base">
            {t("auth:profile.changePassword")}
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
