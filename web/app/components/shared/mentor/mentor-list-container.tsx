import { useSearchParams, useNavigate } from "react-router";
import { DataTablePagination } from "~/components/shared/data-table/data-table-pagination";
import { useMentorsQuery } from "~/hooks/mentor/use-mentors-query";
import {
  parseMentorFilters,
  serializeMentorFilters,
} from "~/lib/mentor-filters";
import type { GetMentorsRequest } from "~/services/mentor/dtos/queries/get-mentors/request";
import { MentorFilterPanel } from "./mentor-filter-panel";
import { MentorPublicGrid } from "./mentor-public-grid";

interface MentorListContainerProps {
  /**
   * Base path used when navigating to a mentor detail page.
   * e.g. "/mentors" → navigates to "/mentors/{id}"
   *      "/user/mentors" → navigates to "/user/mentors/{id}"
   */
  detailBasePath: string;
  /**
   * Default page size. Defaults to 9 (fits 3-column grid nicely).
   */
  defaultPageSize?: number;
}

/**
 * Orchestrator component for the public/user mentor listing.
 * Manages URL-driven filter + pagination state, fetches data,
 * and renders the filter panel, grid, and pagination.
 */
export function MentorListContainer({
  detailBasePath,
  defaultPageSize = 9,
}: MentorListContainerProps) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // Parse filters from URL — URL is single source of truth
  const rawFilters = parseMentorFilters(searchParams);
  // Override default page size for grid layout
  const filters: GetMentorsRequest = {
    ...rawFilters,
    pageSize:
      rawFilters.pageSize === 20 ? defaultPageSize : rawFilters.pageSize,
  };

  const { data, isPending } = useMentorsQuery(filters);
  const mentors = data?.items ?? [];

  function updateFilters(patch: Partial<GetMentorsRequest>) {
    const merged: GetMentorsRequest = { ...filters, ...patch };
    // Normalize: if pageSize is the default, don't put it in URL
    if (merged.pageSize === defaultPageSize) {
      merged.pageSize = 20; // serializeMentorFilters omits 20 (its default)
    }
    const next = serializeMentorFilters(merged);
    setSearchParams(next, { replace: true });
  }

  function handleViewDetail(mentor: { id: string }) {
    navigate(`${detailBasePath}/${mentor.id}`);
  }

  return (
    <div className="space-y-6">
      {/* Filter panel */}
      <MentorFilterPanel filters={filters} onFilterChange={updateFilters} />

      {/* Results count when not loading */}
      {!isPending && data && (
        <p className="text-sm text-muted-foreground">
          {data.totalCount === 0
            ? "No mentors found"
            : `${data.totalCount} mentor${data.totalCount !== 1 ? "s" : ""} found`}
        </p>
      )}

      {/* Mentor grid */}
      <MentorPublicGrid
        mentors={mentors}
        isLoading={isPending}
        onViewDetail={handleViewDetail}
      />

      {/* Pagination */}
      {data && data.totalPages > 1 && (
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
    </div>
  );
}
