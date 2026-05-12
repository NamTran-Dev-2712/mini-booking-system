import type { GetMentorsRequest } from "~/services/mentor/dtos/queries/get-mentors/request";

/**
 * Parses URL search params into a GetMentorsRequest object.
 * URL is the single source of truth for filter/sort/pagination state.
 */
export function parseMentorFilters(
  searchParams: URLSearchParams,
): GetMentorsRequest {
  const pageNumber = Number(searchParams.get("page") ?? "1");
  const pageSize = Number(searchParams.get("pageSize") ?? "20");
  const sortBy = searchParams.get("sort") ?? undefined;
  const sortOrder = (searchParams.get("order") ?? "asc") as "asc" | "desc";
  const searchTerm = searchParams.get("q") ?? undefined;
  const minBasePrice = searchParams.get("minPrice")
    ? Number(searchParams.get("minPrice"))
    : undefined;
  const maxBasePrice = searchParams.get("maxPrice")
    ? Number(searchParams.get("maxPrice"))
    : undefined;
  const minExperienceYears = searchParams.get("minExp")
    ? Number(searchParams.get("minExp"))
    : undefined;
  const maxExperienceYears = searchParams.get("maxExp")
    ? Number(searchParams.get("maxExp"))
    : undefined;

  return {
    pageNumber: isNaN(pageNumber) ? 1 : pageNumber,
    pageSize: isNaN(pageSize) ? 20 : pageSize,
    sortBy: sortBy || undefined,
    sortOrder,
    searchTerm: searchTerm || undefined,
    minBasePrice,
    maxBasePrice,
    minExperienceYears,
    maxExperienceYears,
  };
}

/**
 * Serializes a GetMentorsRequest back to URLSearchParams.
 */
export function serializeMentorFilters(
  filters: GetMentorsRequest,
): URLSearchParams {
  const params = new URLSearchParams();

  if (filters.pageNumber && filters.pageNumber !== 1)
    params.set("page", String(filters.pageNumber));
  if (filters.pageSize && filters.pageSize !== 20)
    params.set("pageSize", String(filters.pageSize));
  if (filters.sortBy) params.set("sort", filters.sortBy);
  if (filters.sortOrder && filters.sortOrder !== "asc")
    params.set("order", filters.sortOrder);
  if (filters.searchTerm) params.set("q", filters.searchTerm);
  if (filters.minBasePrice != null)
    params.set("minPrice", String(filters.minBasePrice));
  if (filters.maxBasePrice != null)
    params.set("maxPrice", String(filters.maxBasePrice));
  if (filters.minExperienceYears != null)
    params.set("minExp", String(filters.minExperienceYears));
  if (filters.maxExperienceYears != null)
    params.set("maxExp", String(filters.maxExperienceYears));

  return params;
}
