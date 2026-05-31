import {
  ArrowLeft,
  Briefcase,
  Calendar,
  Clock,
  DollarSign,
  Mail,
  MapPin,
  Phone,
  User,
} from "lucide-react";
import { MENTOR_SOCIAL_FIELDS } from "~/components/shared/mentor/social-links";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";
import { Skeleton } from "~/components/ui/skeleton";
import { cn } from "~/lib/utils";
import { useMentorDetailQuery } from "~/hooks/mentor/use-mentor-detail-query";
import { BookingConfirmDialog } from "~/components/shared/booking/booking-confirm-dialog";
import { SLOT_STATUS, SLOT_STATUS_LABEL } from "~/types/mentor/mentor";
import type { MentorSlot } from "~/types/mentor/mentor";

interface MentorDetailViewProps {
  mentorId: string;
  context: "public" | "user";
}

function formatPrice(price: number) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(price);
}

function formatSlotTime(iso: string) {
  return new Date(iso).toLocaleString("vi-VN", {
    weekday: "short",
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function SlotCard({
  slot,
  context,
  onBook,
}: {
  slot: MentorSlot;
  context: "public" | "user";
  onBook?: (slot: MentorSlot) => void;
}) {
  const isAvailable = slot.status === SLOT_STATUS.Available;
  const isFull = slot.currentBookings >= slot.maxBookings;
  const spotsLeft = slot.maxBookings - slot.currentBookings;

  const statusVariant: Record<
    number,
    "default" | "secondary" | "destructive" | "outline"
  > = {
    [SLOT_STATUS.Available]: "default",
    [SLOT_STATUS.FullyBooked]: "secondary",
    [SLOT_STATUS.Blocked]: "outline",
    [SLOT_STATUS.Cancelled]: "destructive",
    [SLOT_STATUS.Completed]: "outline",
  };

  return (
    <div
      className={cn(
        "flex flex-col gap-2 rounded-lg border p-4 transition-colors sm:flex-row sm:items-center sm:justify-between",
        isAvailable ? "hover:bg-muted/50" : "opacity-60",
      )}
    >
      <div className="space-y-1">
        <p className="text-sm font-semibold">{slot.name}</p>
        <div className="flex items-center gap-2 text-sm font-medium">
          <Clock className="size-3.5 text-muted-foreground" />
          <span>{formatSlotTime(slot.startTime)}</span>
          <span className="text-muted-foreground">—</span>
          <span>{formatSlotTime(slot.endTime)}</span>
        </div>
        {slot.description && (
          <p className="text-xs text-muted-foreground">{slot.description}</p>
        )}
        {slot.location && (
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <MapPin className="size-3.5 shrink-0" />
            <span className="break-all">{slot.location}</span>
          </div>
        )}
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="font-medium text-foreground">
            {formatPrice(slot.price)}
          </span>
          <Badge
            variant={statusVariant[slot.status] ?? "secondary"}
            className="text-xs"
          >
            {SLOT_STATUS_LABEL[slot.status] ?? "Unknown"}
          </Badge>
          {isAvailable && (
            <span>
              {isFull ? (
                <Badge variant="secondary" className="text-xs">
                  Full
                </Badge>
              ) : (
                <span>
                  {spotsLeft} spot{spotsLeft !== 1 ? "s" : ""} left
                </span>
              )}
            </span>
          )}
        </div>
      </div>
      {context === "user" && isAvailable && !isFull && (
        <Button
          size="sm"
          className="shrink-0 self-end sm:self-auto"
          onClick={() => onBook?.(slot)}
        >
          Book
        </Button>
      )}
    </div>
  );
}

function DetailSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-8 w-32" />
      <div className="flex flex-col gap-6 lg:flex-row">
        <div className="flex-1 space-y-4">
          <div className="flex items-center gap-4">
            <Skeleton className="size-20 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-40" />
            </div>
          </div>
          <Skeleton className="h-24 w-full" />
        </div>
        <div className="w-full space-y-3 lg:w-80">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
    </div>
  );
}

export function MentorDetailView({ mentorId, context }: MentorDetailViewProps) {
  const navigate = useNavigate();
  const { data: mentor, isPending, isError } = useMentorDetailQuery(mentorId);
  const [bookingSlot, setBookingSlot] = useState<MentorSlot | null>(null);

  const backPath = context === "user" ? "/user/mentors" : "/mentors";

  if (isPending) return <DetailSkeleton />;

  if (isError || !mentor) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <User className="mb-4 size-10 text-muted-foreground/50" />
        <p className="text-sm font-medium text-muted-foreground">
          Mentor not found or failed to load.
        </p>
        <Button
          variant="outline"
          size="sm"
          className="mt-4"
          onClick={() => navigate(backPath)}
        >
          Back to Mentors
        </Button>
      </div>
    );
  }

  const initials =
    (mentor.displayName ?? "")
      .split(" ")
      .filter(Boolean)
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "?";

  const availableSlots = mentor.slots.filter(
    (s) => s.status === SLOT_STATUS.Available,
  );
  const allSlots = mentor.slots;

  return (
    <div className="space-y-6">
      {/* Back button */}
      <Button
        variant="ghost"
        size="sm"
        className="gap-1.5 text-muted-foreground hover:text-foreground"
        onClick={() => navigate(backPath)}
      >
        <ArrowLeft className="size-4" />
        Back to Mentors
      </Button>

      {/* Main content */}
      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Left column — Profile info */}
        <div className="flex-1 space-y-6">
          {/* Profile header */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
                <div className="relative shrink-0">
                  <Avatar className="size-20 ring-2 ring-border ring-offset-2 ring-offset-background">
                    <AvatarImage
                      src={mentor.avatarUrl ?? undefined}
                      alt={mentor.displayName}
                    />
                    <AvatarFallback className="text-lg font-semibold">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  {mentor.isActive && (
                    <span className="absolute bottom-1 right-1 size-3.5 rounded-full bg-green-500 ring-2 ring-background" />
                  )}
                </div>

                <div className="min-w-0 flex-1 text-center sm:text-left">
                  <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                    <h1 className="text-xl font-semibold">
                      {mentor.displayName}
                    </h1>
                    <Badge variant={mentor.isActive ? "default" : "secondary"}>
                      {mentor.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </div>

                  {mentor.specialization && (
                    <p className="mt-1 text-sm text-muted-foreground">
                      {mentor.specialization}
                    </p>
                  )}

                  <div className="mt-3 flex flex-wrap items-center justify-center gap-4 text-sm sm:justify-start">
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <Briefcase className="size-3.5" />
                      <span>
                        {mentor.experienceYears} year
                        {mentor.experienceYears !== 1 ? "s" : ""} experience
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 font-medium">
                      <DollarSign className="size-3.5 text-muted-foreground" />
                      <span>{formatPrice(mentor.basePrice)}</span>
                    </div>
                  </div>

                  <div className="mt-3 flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground sm:justify-start">
                    <div className="flex items-center gap-1.5">
                      <Mail className="size-3.5" />
                      <span>{mentor.email}</span>
                    </div>
                    {mentor.phoneNumber && (
                      <div className="flex items-center gap-1.5">
                        <Phone className="size-3.5" />
                        <span>{mentor.phoneNumber}</span>
                      </div>
                    )}
                  </div>

                  {/* Social links */}
                  {MENTOR_SOCIAL_FIELDS.some((s) => mentor[s.key]) && (
                    <div className="mt-3 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                      {MENTOR_SOCIAL_FIELDS.filter((s) => mentor[s.key]).map(
                        (social) => (
                          <a
                            key={social.key}
                            href={mentor[social.key] as string}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={social.label}
                            title={social.label}
                            className="flex size-8 items-center justify-center rounded-full border text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                          >
                            <social.icon className="size-4" />
                          </a>
                        ),
                      )}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Bio */}
          {mentor.bio && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">About</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-muted-foreground whitespace-pre-line">
                  {mentor.bio}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Skills */}
          {mentor.skills.length > 0 && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {mentor.skills.map((skill) => (
                    <Badge
                      key={skill.id}
                      variant="secondary"
                      className="text-sm"
                    >
                      {skill.skillName}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right column — Slots */}
        <div className="w-full lg:w-96">
          <Card className="sticky top-24">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Calendar className="size-4" />
                Sessions
                {availableSlots.length > 0 && (
                  <Badge variant="default" className="text-xs">
                    {availableSlots.length} available
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {allSlots.length === 0 ? (
                <div className="py-8 text-center">
                  <Calendar className="mx-auto mb-3 size-8 text-muted-foreground/50" />
                  <p className="text-sm text-muted-foreground">
                    No sessions scheduled yet.
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground/70">
                    Check back later for new openings.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {allSlots.map((slot) => (
                    <SlotCard
                      key={slot.id}
                      slot={slot}
                      context={context}
                      onBook={(s) => setBookingSlot(s)}
                    />
                  ))}
                </div>
              )}

              {context === "public" && availableSlots.length > 0 && (
                <>
                  <Separator className="my-4" />
                  <Button className="w-full" asChild>
                    <Link to="/login">Sign in to Book a Session</Link>
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Booking confirmation dialog */}
      {context === "user" && bookingSlot && (
        <BookingConfirmDialog
          open={!!bookingSlot}
          onOpenChange={(open) => !open && setBookingSlot(null)}
          slot={bookingSlot}
          mentorName={mentor.displayName}
        />
      )}
    </div>
  );
}
