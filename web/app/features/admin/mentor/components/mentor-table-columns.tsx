import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { MoreHorizontal } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { DataTableColumnHeader } from "~/components/shared/data-table/data-table-column-header";
import type { Mentor } from "~/types/mentor/mentor";

interface MentorColumnsOptions {
  onEdit: (mentor: Mentor) => void;
  onDelete: (mentor: Mentor) => void;
  onViewDetail: (mentor: Mentor) => void;
}

export function getMentorColumns({
  onEdit,
  onDelete,
  onViewDetail,
}: MentorColumnsOptions): ColumnDef<Mentor>[] {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = useTranslation("mentor");

  return [
    {
      id: "mentor",
      accessorFn: (row) => row.displayName,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("columns.mentor")} />
      ),
      cell: ({ row }) => {
        const mentor = row.original;
        const initials =
          (mentor.displayName ?? "")
            .split(" ")
            .filter(Boolean)
            .map((n) => n[0])
            .join("")
            .slice(0, 2)
            .toUpperCase() || "?";

        return (
          <div className="flex items-center gap-3 min-w-0">
            <Avatar className="size-8 shrink-0">
              {mentor.avatarUrl && (
                <AvatarImage src={mentor.avatarUrl} alt={mentor.displayName} />
              )}
              <AvatarFallback className="bg-primary/10 text-xs font-semibold text-primary">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium leading-tight">
                {mentor.displayName}
              </p>
              <p className="truncate text-xs text-muted-foreground">
                {mentor.email}
              </p>
            </div>
          </div>
        );
      },
      enableHiding: false,
    },

    {
      id: "specialization",
      accessorKey: "specialization",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("columns.specialization")}
        />
      ),
      cell: ({ getValue }) => {
        const val = getValue<string | null>();
        return val ? (
          <span className="text-sm">{val}</span>
        ) : (
          <span className="text-xs text-muted-foreground">—</span>
        );
      },
    },

    {
      id: "experience",
      accessorKey: "experienceYears",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("columns.experience")}
        />
      ),
      cell: ({ getValue }) => {
        const years = getValue<number>();
        return (
          <span className="text-sm">
            {years} {t("detail.experienceYears", { count: years })}
          </span>
        );
      },
    },

    {
      id: "basePrice",
      accessorKey: "basePrice",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("columns.basePrice")} />
      ),
      cell: ({ getValue }) => {
        const price = getValue<number>();
        return (
          <span className="text-sm font-medium">
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
              maximumFractionDigits: 0,
            }).format(price)}
          </span>
        );
      },
    },

    {
      id: "status",
      accessorKey: "isActive",
      header: t("columns.status"),
      cell: ({ getValue }) => {
        const active = getValue<boolean>();
        return (
          <Badge variant={active ? "default" : "secondary"} className="text-xs">
            {active ? t("detail.active") : t("detail.inactive")}
          </Badge>
        );
      },
    },

    {
      id: "createdAt",
      accessorKey: "createdAt",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("columns.created")} />
      ),
      cell: ({ getValue }) => {
        const date = getValue<string>();
        return (
          <span className="text-xs text-muted-foreground">
            {format(new Date(date), "dd MMM yyyy")}
          </span>
        );
      },
    },

    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const mentor = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="size-8"
                aria-label="Open actions"
                onClick={(e) => e.stopPropagation()}
              >
                <MoreHorizontal className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel className="text-xs">
                {t("columns.actions")}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onViewDetail(mentor)}>
                {t("columns.viewDetail")}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onEdit(mentor)}>
                {t("columns.edit")}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => onDelete(mentor)}
                className="text-destructive focus:text-destructive"
              >
                {t("columns.delete")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
}
