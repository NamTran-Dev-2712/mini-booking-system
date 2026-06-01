import { format } from "date-fns";
import { Lock, MoreHorizontal, Unlock } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Skeleton } from "~/components/ui/skeleton";
import type { Mentor } from "~/types/mentor/mentor";

interface MentorCardListProps {
  mentors: Mentor[];
  isLoading?: boolean;
  onEdit: (mentor: Mentor) => void;
  onDelete: (mentor: Mentor) => void;
  onViewDetail: (mentor: Mentor) => void;
  onToggleStatus: (mentor: Mentor) => void;
}

export function MentorCardList({
  mentors,
  isLoading = false,
  onEdit,
  onDelete,
  onViewDetail,
  onToggleStatus,
}: MentorCardListProps) {
  const { t } = useTranslation("mentor");

  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Card key={i}>
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Skeleton className="size-10 rounded-full shrink-0" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-48" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (mentors.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-16 text-center">
        <p className="text-sm text-muted-foreground">
          {t("list.noMentorsFound")}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {mentors.map((mentor) => {
        const initials =
          (mentor.displayName ?? "")
            .split(" ")
            .filter(Boolean)
            .map((n) => n[0])
            .join("")
            .slice(0, 2)
            .toUpperCase() || "?";

        return (
          <Card
            key={mentor.id}
            className="cursor-pointer transition-colors hover:bg-accent/50"
            onClick={() => onViewDetail(mentor)}
          >
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Avatar className="size-10 shrink-0">
                  {mentor.avatarUrl && (
                    <AvatarImage
                      src={mentor.avatarUrl}
                      alt={mentor.displayName}
                    />
                  )}
                  <AvatarFallback className="bg-primary/10 text-sm font-semibold text-primary">
                    {initials}
                  </AvatarFallback>
                </Avatar>

                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="truncate font-medium text-sm">
                        {mentor.displayName}
                      </p>
                      <p className="truncate text-xs text-muted-foreground">
                        {mentor.email}
                      </p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-7 shrink-0"
                          onClick={(e) => e.stopPropagation()}
                          aria-label="Actions"
                        >
                          <MoreHorizontal className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation();
                            onViewDetail(mentor);
                          }}
                        >
                          {t("columns.viewDetail")}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation();
                            onEdit(mentor);
                          }}
                        >
                          {t("columns.edit")}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleStatus(mentor);
                          }}
                        >
                          {mentor.isActive ? (
                            <Lock className="size-4" />
                          ) : (
                            <Unlock className="size-4" />
                          )}
                          {mentor.isActive
                            ? t("columns.lock")
                            : t("columns.unlock")}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation();
                            onDelete(mentor);
                          }}
                          className="text-destructive focus:text-destructive"
                        >
                          {t("columns.delete")}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <Badge
                      variant={mentor.isActive ? "default" : "secondary"}
                      className="text-xs"
                    >
                      {mentor.isActive
                        ? t("detail.active")
                        : t("detail.inactive")}
                    </Badge>
                    {mentor.specialization && (
                      <span className="text-xs text-muted-foreground">
                        {mentor.specialization}
                      </span>
                    )}
                    <span className="text-xs text-muted-foreground">
                      {mentor.experienceYears}{" "}
                      {t("detail.experienceYears", {
                        count: mentor.experienceYears,
                      })}
                    </span>
                    <span className="text-xs font-medium">
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                        maximumFractionDigits: 0,
                      }).format(mentor.basePrice)}
                    </span>
                  </div>

                  <p className="mt-1 text-xs text-muted-foreground">
                    Joined {format(new Date(mentor.createdAt), "dd MMM yyyy")}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
