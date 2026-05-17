import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "~/lib/query-keys";
import { dashboardService } from "~/services/dashboard/dashboard.service";

export function useMentorDashboardQuery(months = 6) {
  return useQuery({
    queryKey: queryKeys.dashboard.mentor(),
    queryFn: () => dashboardService.getMentorDashboard(months),
    staleTime: 2 * 60_000,
  });
}
