import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "~/lib/query-keys";
import { authService } from "~/services/auth/auth.service";

export function useProfileQuery() {
  return useQuery({
    queryKey: queryKeys.auth.profile(),
    queryFn: () => authService.getProfile(),
    staleTime: 60_000,
  });
}
