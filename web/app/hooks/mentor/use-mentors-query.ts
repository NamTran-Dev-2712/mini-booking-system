import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { queryKeys } from "~/lib/query-keys";
import { mentorService } from "~/services/mentor/mentor.service";
import type { GetMentorsRequest } from "~/services/mentor/dtos/queries/get-mentors/request";

/**
 * Fetches the paginated mentor list.
 * Uses keepPreviousData so the table doesn't flash empty while paginating.
 * staleTime is inherited from QueryClient defaults (30s).
 */
export function useMentorsQuery(filters: GetMentorsRequest = {}) {
  return useQuery({
    queryKey: queryKeys.mentors.list(filters),
    queryFn: () => mentorService.getMentors(filters),
    placeholderData: keepPreviousData,
  });
}
