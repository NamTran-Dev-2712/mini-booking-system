import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "~/lib/query-keys";
import { mentorService } from "~/services/mentor/mentor.service";

/**
 * Fetches a single mentor's full detail (profile + skills + slots).
 * staleTime is 60s for detail — slightly longer than list since it's
 * less likely to change while the admin is viewing it.
 */
export function useMentorDetailQuery(id: string) {
  return useQuery({
    queryKey: queryKeys.mentors.detail(id),
    queryFn: () => mentorService.getMentorDetail(id),
    staleTime: 60_000,
    enabled: !!id,
  });
}
