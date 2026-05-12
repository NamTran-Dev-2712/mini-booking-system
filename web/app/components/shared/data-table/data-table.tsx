import {
  flexRender,
  type ColumnDef,
  type Table as TanstackTable,
} from "@tanstack/react-table";
import { Skeleton } from "~/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { cn } from "~/lib/utils";

interface DataTableProps<TData> {
  table: TanstackTable<TData>;
  columns: ColumnDef<TData, unknown>[];
  isLoading?: boolean;
  /** Number of skeleton rows to show while loading */
  skeletonRows?: number;
  /** Rendered when there are no rows and not loading */
  emptyState?: React.ReactNode;
  /** Called when a row is clicked */
  onRowClick?: (row: TData) => void;
  /** Row id of the currently highlighted row (keyboard nav) */
  highlightedRowId?: string;
  getRowId?: (row: TData) => string;
}

export function DataTable<TData>({
  table,
  columns,
  isLoading = false,
  skeletonRows = 8,
  emptyState,
  onRowClick,
  highlightedRowId,
  getRowId,
}: DataTableProps<TData>) {
  const rows = table.getRowModel().rows;

  return (
    <div className="rounded-lg border overflow-hidden">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((hg) => (
            <TableRow key={hg.id} className="hover:bg-transparent">
              {hg.headers.map((header) => (
                <TableHead key={header.id} className="h-10 text-xs">
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {isLoading ? (
            // Skeleton rows
            Array.from({ length: skeletonRows }).map((_, i) => (
              <TableRow key={`skeleton-${i}`}>
                {columns.map((_, j) => (
                  <TableCell key={j}>
                    <Skeleton className="h-4 w-full" />
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : rows.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-48 text-center">
                {emptyState ?? (
                  <span className="text-sm text-muted-foreground">
                    No results found.
                  </span>
                )}
              </TableCell>
            </TableRow>
          ) : (
            rows.map((row) => {
              const rowId = getRowId ? getRowId(row.original) : row.id;
              const isHighlighted = highlightedRowId === rowId;

              return (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() ? "selected" : undefined}
                  tabIndex={0}
                  onClick={() => onRowClick?.(row.original)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") onRowClick?.(row.original);
                  }}
                  className={cn(
                    onRowClick && "cursor-pointer",
                    isHighlighted && "bg-accent",
                  )}
                  aria-selected={isHighlighted}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-3 text-sm">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
}
