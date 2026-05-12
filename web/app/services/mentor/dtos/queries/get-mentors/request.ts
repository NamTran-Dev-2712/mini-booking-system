/**
 * Maps to BE's GetMentorQuery (extends BaseFilterQuery)
 */
export interface GetMentorsRequest {
  pageNumber?: number;
  pageSize?: number;
  sortBy?: string | null;
  sortOrder?: "asc" | "desc";
  searchTerm?: string | null;
  minBasePrice?: number | null;
  maxBasePrice?: number | null;
  minExperienceYears?: number | null;
  maxExperienceYears?: number | null;
}
