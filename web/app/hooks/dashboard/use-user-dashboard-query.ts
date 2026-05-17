import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "~/lib/query-keys";
import { dashboardService } from "~/services/dashboard/dashboard.service";

export function useUserDashboardQuery(months = 6) {
  return useQuery({
    queryKey: queryKeys.dashboard.user(),
    queryFn: () => dashboardService.getUserDashboard(months),
    staleTime: 2 * 60_000,
  });
}
