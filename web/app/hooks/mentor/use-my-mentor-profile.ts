import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "~/lib/query-keys";
import { mentorService } from "~/services/mentor/mentor.service";
import { useAuthStore } from "~/stores/auth.store";

/**
 * Resolves the current user's Mentor profile.
 * Searches mentors by the user's email to find their mentorId,
 * then fetches the full mentor detail (profile + skills + slots).
 */
export function useMyMentorProfile() {
  const user = useAuthStore((s) => s.user);

  const mentorListQuery = useQuery({
    queryKey: ["mentors", "my-profile-resolve", user?.email],
    queryFn: () =>
      mentorService.getMentors({ searchTerm: user!.email, pageSize: 1 }),
    enabled: !!user?.email,
    staleTime: Infinity,
  });

  const mentorId = mentorListQuery.data?.items[0]?.id;

  const detailQuery = useQuery({
    queryKey: queryKeys.mentors.detail(mentorId ?? ""),
    queryFn: () => mentorService.getMentorDetail(mentorId!),
    enabled: !!mentorId,
    staleTime: 60_000,
  });

  return {
    mentorId,
    mentor: detailQuery.data,
    isPending:
      mentorListQuery.isPending || (!!mentorId && detailQuery.isPending),
    isError: mentorListQuery.isError || detailQuery.isError,
    refetch: detailQuery.refetch,
  };
}
