import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { MoreHorizontal } from "lucide-react";
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
  return [
    // ── Avatar + Name ──────────────────────────────────────────────────────
    {
      id: "mentor",
      accessorFn: (row) => row.displayName,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Mentor" />
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

    // ── Specialization ─────────────────────────────────────────────────────
    {
      id: "specialization",
      accessorKey: "specialization",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Specialization" />
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

    // ── Experience ─────────────────────────────────────────────────────────
    {
      id: "experience",
      accessorKey: "experienceYears",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Experience" />
      ),
      cell: ({ getValue }) => {
        const years = getValue<number>();
        return (
          <span className="text-sm">
            {years} yr{years !== 1 ? "s" : ""}
          </span>
        );
      },
    },

    // ── Base Price ─────────────────────────────────────────────────────────
    {
      id: "basePrice",
      accessorKey: "basePrice",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Base Price" />
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

    // ── Status ─────────────────────────────────────────────────────────────
    {
      id: "status",
      accessorKey: "isActive",
      header: "Status",
      cell: ({ getValue }) => {
        const active = getValue<boolean>();
        return (
          <Badge variant={active ? "default" : "secondary"} className="text-xs">
            {active ? "Active" : "Inactive"}
          </Badge>
        );
      },
    },

    // ── Created At ─────────────────────────────────────────────────────────
    {
      id: "createdAt",
      accessorKey: "createdAt",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Created" />
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

    // ── Actions ────────────────────────────────────────────────────────────
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
              <DropdownMenuLabel className="text-xs">Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onViewDetail(mentor)}>
                View detail
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onEdit(mentor)}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => onDelete(mentor)}
                className="text-destructive focus:text-destructive"
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
}
