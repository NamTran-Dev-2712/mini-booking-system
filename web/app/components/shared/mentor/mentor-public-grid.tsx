import { Users } from "lucide-react";
import { Skeleton } from "~/components/ui/skeleton";
import { Card, CardContent, CardFooter } from "~/components/ui/card";
import { cn } from "~/lib/utils";
import type { Mentor } from "~/types/mentor/mentor";
import { MentorPublicCard } from "./mentor-public-card";

interface MentorPublicGridProps {
  mentors: Mentor[];
  isLoading?: boolean;
  onViewDetail?: (mentor: Mentor) => void;
  className?: string;
}

const SKELETON_COUNT = 9;

function MentorCardSkeleton() {
  return (
    <Card className="flex flex-col overflow-hidden">
      <CardContent className="flex flex-col items-center gap-4 p-6 pb-4">
        <Skeleton className="size-20 rounded-full" />
        <div className="space-y-2 w-full text-center">
          <Skeleton className="h-4 w-3/4 mx-auto" />
          <Skeleton className="h-3 w-1/2 mx-auto" />
        </div>
        <div className="flex items-center gap-4 w-full justify-center">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-3 w-20" />
        </div>
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-4/5" />
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Skeleton className="h-8 w-full" />
      </CardFooter>
    </Card>
  );
}

/**
 * Responsive grid for displaying mentor cards.
 * 1 column on mobile, 2 on tablet, 3 on desktop.
 */
export function MentorPublicGrid({
  mentors,
  isLoading = false,
  onViewDetail,
  className,
}: MentorPublicGridProps) {
  if (isLoading) {
    return (
      <div
        className={cn(
          "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3",
          className,
        )}
        aria-busy="true"
        aria-label="Loading mentors"
      >
        {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
          <MentorCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (mentors.length === 0) {
    return (
      <div
        className={cn(
          "flex flex-col items-center justify-center rounded-xl border border-dashed py-16 text-center",
          className,
        )}
      >
        <Users className="mb-4 size-10 text-muted-foreground/50" />
        <p className="text-sm font-medium text-muted-foreground">
          No mentors found
        </p>
        <p className="mt-1 text-xs text-muted-foreground/70">
          Try adjusting your filters or search term
        </p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3",
        className,
      )}
    >
      {mentors.map((mentor) => (
        <MentorPublicCard
          key={mentor.id}
          mentor={mentor}
          onViewDetail={onViewDetail}
        />
      ))}
    </div>
  );
}
