import { Briefcase, DollarSign, Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardFooter } from "~/components/ui/card";
import { cn } from "~/lib/utils";
import type { Mentor } from "~/types/mentor/mentor";

interface MentorPublicCardProps {
  mentor: Mentor;
  onViewDetail?: (mentor: Mentor) => void;
  className?: string;
}

/**
 * Public-facing mentor card for grid display.
 * Shows avatar, name, specialization, experience, and price.
 */
export function MentorPublicCard({
  mentor,
  onViewDetail,
  className,
}: MentorPublicCardProps) {
  const initials = mentor.displayName
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const formattedPrice = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(mentor.basePrice);

  return (
    <Card
      className={cn(
        "group flex flex-col overflow-hidden transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 cursor-pointer",
        className,
      )}
      onClick={() => onViewDetail?.(mentor)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onViewDetail?.(mentor);
        }
      }}
      aria-label={`View ${mentor.displayName}'s profile`}
    >
      <CardContent className="flex flex-col items-center gap-4 p-6 pb-4 flex-1">
        {/* Avatar */}
        <div className="relative">
          <Avatar
            size="lg"
            className="size-20 ring-2 ring-border ring-offset-2 ring-offset-background"
          >
            <AvatarImage
              src={mentor.avatarUrl ?? undefined}
              alt={mentor.displayName}
            />
            <AvatarFallback className="text-lg font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>
          {mentor.isActive && (
            <span
              className="absolute bottom-0.5 right-0.5 size-3.5 rounded-full bg-green-500 ring-2 ring-background"
              aria-label="Active"
              title="Active"
            />
          )}
        </div>

        {/* Name & specialization */}
        <div className="text-center space-y-1 w-full">
          <h3 className="font-semibold text-base leading-tight line-clamp-1 group-hover:text-primary transition-colors">
            {mentor.displayName}
          </h3>
          {mentor.specialization && (
            <p className="text-sm text-muted-foreground line-clamp-1">
              {mentor.specialization}
            </p>
          )}
        </div>

        {/* Stats */}
        <div className="flex items-center justify-center gap-4 w-full text-sm">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Briefcase className="size-3.5 shrink-0" />
            <span>{mentor.experienceYears}y exp</span>
          </div>
          <div className="w-px h-4 bg-border" />
          <div className="flex items-center gap-1.5 font-medium text-foreground">
            <DollarSign className="size-3.5 shrink-0 text-muted-foreground" />
            <span className="line-clamp-1">{formattedPrice}</span>
          </div>
        </div>

        {/* Bio snippet */}
        {mentor.bio && (
          <p className="text-xs text-muted-foreground text-center line-clamp-2 leading-relaxed">
            {mentor.bio}
          </p>
        )}
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          variant="outline"
          size="sm"
          className="w-full gap-1.5 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            onViewDetail?.(mentor);
          }}
          tabIndex={-1}
        >
          <Star className="size-3.5" />
          View Profile
        </Button>
      </CardFooter>
    </Card>
  );
}
