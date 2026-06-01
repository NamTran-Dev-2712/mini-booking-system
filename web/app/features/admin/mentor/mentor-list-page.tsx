import {
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type SortingState,
} from "@tanstack/react-table";
import { useQueryClient } from "@tanstack/react-query";
import { RefreshCw, UserPlus } from "lucide-react";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useSearchParams } from "react-router";
import { useHotkeys } from "react-hotkeys-hook";
import { Button } from "~/components/ui/button";
import { Kbd } from "~/components/ui/kbd";
import { DataTable } from "~/components/shared/data-table/data-table";
import { DataTablePagination } from "~/components/shared/data-table/data-table-pagination";
import { DataTableViewOptions } from "~/components/shared/data-table/data-table-view-options";
import { CommandPalette } from "~/components/shared/command-palette";
import { MentorFilterPanel } from "~/components/shared/mentor/mentor-filter-panel";
import { useCommandPalette } from "~/hooks/use-command-palette";
import { useMentorsQuery } from "~/hooks/mentor/use-mentors-query";
import { HotkeyScopes } from "~/lib/hotkeys/hotkey-scopes";
import { queryKeys } from "~/lib/query-keys";
import type { Mentor } from "~/types/mentor/mentor";
import { getMentorColumns } from "./components/mentor-table-columns";
import { MentorCardList } from "./components/mentor-card-list";
import { MentorCreateDialog } from "./components/mentor-create-dialog";
import { MentorEditDialogLoader } from "./components/mentor-edit-dialog-loader";
import { MentorDeleteDialog } from "./components/mentor-delete-dialog";
import { MentorStatusDialog } from "./components/mentor-status-dialog";
import { MentorShortcutHelp } from "./components/mentor-shortcut-help";
import {
  parseMentorFilters,
  serializeMentorFilters,
} from "./lib/mentor-filters";

export function MentorListPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const qc = useQueryClient();

  // ── URL-driven filter state ──────────────────────────────────────────────
  const filters = parseMentorFilters(searchParams);

  // ── Local UI state ───────────────────────────────────────────────────────
  const [createOpen, setCreateOpen] = useState(false);
  const [editMentor, setEditMentor] = useState<Mentor | null>(null);
  const [deleteMentor, setDeleteMentor] = useState<Mentor | null>(null);
  const [statusMentor, setStatusMentor] = useState<Mentor | null>(null);
  const [helpOpen, setHelpOpen] = useState(false);
  const [highlightedId, setHighlightedId] = useState<string | undefined>();
  const commandPalette = useCommandPalette();

  // ── Data ─────────────────────────────────────────────────────────────────
  const { data, isPending, isFetching } = useMentorsQuery(filters);
  const mentors = data?.items ?? [];

  // ── Table (client-side column visibility + sorting UI only) ─────────────
  const [sorting, setSorting] = useState<SortingState>([]);

  const columns = getMentorColumns({
    onEdit: (m) => setEditMentor(m),
    onDelete: (m) => setDeleteMentor(m),
    onViewDetail: (m) => navigate(`/admin/mentors/${m.id}`),
    onToggleStatus: (m) => setStatusMentor(m),
  });

  const table = useReactTable({
    data: mentors,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: { sorting },
    onSortingChange: (updater) => {
      const next = typeof updater === "function" ? updater(sorting) : updater;
      setSorting(next);
      // Sync sort to URL
      if (next.length > 0) {
        updateFilters({
          sortBy: next[0].id,
          sortOrder: next[0].desc ? "desc" : "asc",
          pageNumber: 1,
        });
      } else {
        updateFilters({ sortBy: undefined, sortOrder: "asc", pageNumber: 1 });
      }
    },
    manualPagination: true,
    manualSorting: true,
    pageCount: data?.totalPages ?? 0,
  });

  // ── Filter helpers ───────────────────────────────────────────────────────
  function updateFilters(patch: Partial<typeof filters>) {
    const next = serializeMentorFilters({ ...filters, ...patch });
    setSearchParams(next, { replace: true });
  }

  // ── Keyboard navigation ──────────────────────────────────────────────────
  const isFormOpen =
    createOpen || !!editMentor || !!deleteMentor || !!statusMentor;

  // New mentor
  useHotkeys("n", () => setCreateOpen(true), {
    scopes: HotkeyScopes.MentorList,
    enabled: !isFormOpen,
  });

  // Refresh
  useHotkeys(
    "r",
    () => {
      qc.invalidateQueries({ queryKey: queryKeys.mentors.lists() });
    },
    { scopes: HotkeyScopes.MentorList, enabled: !isFormOpen },
  );

  // Prev page
  useHotkeys(
    "left",
    () => {
      if (data?.hasPreviousPage)
        updateFilters({ pageNumber: filters.pageNumber! - 1 });
    },
    { scopes: HotkeyScopes.MentorList, enabled: !isFormOpen },
  );

  // Next page
  useHotkeys(
    "right",
    () => {
      if (data?.hasNextPage)
        updateFilters({ pageNumber: filters.pageNumber! + 1 });
    },
    { scopes: HotkeyScopes.MentorList, enabled: !isFormOpen },
  );

  // Row navigation j/k
  const moveHighlight = useCallback(
    (dir: 1 | -1) => {
      if (mentors.length === 0) return;
      const idx = mentors.findIndex((m) => m.id === highlightedId);
      const next =
        idx === -1 ? 0 : Math.max(0, Math.min(mentors.length - 1, idx + dir));
      setHighlightedId(mentors[next]?.id);
    },
    [mentors, highlightedId],
  );

  useHotkeys("j", () => moveHighlight(1), {
    scopes: HotkeyScopes.MentorList,
    enabled: !isFormOpen,
  });
  useHotkeys("k", () => moveHighlight(-1), {
    scopes: HotkeyScopes.MentorList,
    enabled: !isFormOpen,
  });

  // Enter → open detail
  useHotkeys(
    "enter",
    () => {
      if (highlightedId) navigate(`/admin/mentors/${highlightedId}`);
    },
    {
      scopes: HotkeyScopes.MentorList,
      enabled: !isFormOpen && !!highlightedId,
    },
  );

  // d → delete highlighted
  useHotkeys(
    "d",
    () => {
      const m = mentors.find((x) => x.id === highlightedId);
      if (m) setDeleteMentor(m);
    },
    {
      scopes: HotkeyScopes.MentorList,
      enabled: !isFormOpen && !!highlightedId,
    },
  );

  // ? → help
  useHotkeys("shift+slash", () => setHelpOpen(true), {
    scopes: HotkeyScopes.Global,
  });

  // Cmd+K → command palette
  useHotkeys(
    "mod+k",
    (e) => {
      e.preventDefault();
      commandPalette.toggle();
    },
    { scopes: HotkeyScopes.Global },
  );

  // ── Render ───────────────────────────────────────────────────────────────
  const { t } = useTranslation("mentor");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">
            {t("list.adminTitle")}
          </h2>
          <p className="text-sm text-muted-foreground">
            {t("list.adminSubtitle")}
          </p>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <Button
            variant="outline"
            size="sm"
            className="h-9 gap-1.5"
            onClick={() =>
              qc.invalidateQueries({ queryKey: queryKeys.mentors.lists() })
            }
            disabled={isFetching}
            aria-label="Refresh"
          >
            <RefreshCw
              className={`size-3.5 ${isFetching ? "animate-spin" : ""}`}
            />
            <span className="hidden sm:inline">
              {t("list.adminTitle", { ns: "common", defaultValue: "Refresh" })}
            </span>
            <Kbd>R</Kbd>
          </Button>

          <DataTableViewOptions table={table} />

          <Button onClick={() => setCreateOpen(true)} className="gap-2">
            <UserPlus className="size-4" />
            {t("list.adminTitle", { ns: "common", defaultValue: "New Mentor" })}
            <Kbd className="ml-1">N</Kbd>
          </Button>
        </div>
      </div>

      <MentorFilterPanel filters={filters} onFilterChange={updateFilters} />

      <div className="hidden md:block">
        <DataTable
          table={table}
          columns={columns}
          isLoading={isPending}
          emptyState={
            <div className="flex flex-col items-center gap-2 py-8">
              <p className="text-sm text-muted-foreground">
                {t("list.noMentorsFound")}
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCreateOpen(true)}
              >
                {t("list.createFirstMentor")}
              </Button>
            </div>
          }
          onRowClick={(m) => navigate(`/admin/mentors/${m.id}`)}
          highlightedRowId={highlightedId}
          getRowId={(m) => m.id}
        />
      </div>

      <div className="md:hidden">
        <MentorCardList
          mentors={mentors}
          isLoading={isPending}
          onEdit={(m) => setEditMentor(m)}
          onDelete={(m) => setDeleteMentor(m)}
          onViewDetail={(m) => navigate(`/admin/mentors/${m.id}`)}
          onToggleStatus={(m) => setStatusMentor(m)}
        />
      </div>

      {data && data.totalPages > 0 && (
        <DataTablePagination
          pageNumber={data.pageNumber}
          pageSize={data.pageSize}
          totalPages={data.totalPages}
          totalCount={data.totalCount}
          hasPreviousPage={data.hasPreviousPage}
          hasNextPage={data.hasNextPage}
          onPageChange={(p) => updateFilters({ pageNumber: p })}
          onPageSizeChange={(s) =>
            updateFilters({ pageSize: s, pageNumber: 1 })
          }
        />
      )}

      <MentorCreateDialog open={createOpen} onOpenChange={setCreateOpen} />
      <MentorEditDialogLoader
        mentor={editMentor}
        open={!!editMentor}
        onOpenChange={(o) => !o && setEditMentor(null)}
      />
      <MentorDeleteDialog
        mentor={deleteMentor}
        open={!!deleteMentor}
        onOpenChange={(o) => !o && setDeleteMentor(null)}
      />
      <MentorStatusDialog
        mentor={statusMentor}
        open={!!statusMentor}
        onOpenChange={(o) => !o && setStatusMentor(null)}
      />
      <MentorShortcutHelp open={helpOpen} onOpenChange={setHelpOpen} />
      <CommandPalette
        open={commandPalette.open}
        onOpenChange={commandPalette.setOpen}
        onNewMentor={() => setCreateOpen(true)}
      />
    </div>
  );
}
