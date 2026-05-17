import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "~/lib/query-keys";
import { dashboardService } from "~/services/dashboard/dashboard.service";

export function useAdminDashboardQuery(months = 6) {
  return useQuery({
    queryKey: queryKeys.dashboard.admin(),
    queryFn: () => dashboardService.getAdminDashboard(months),
    staleTime: 2 * 60_000,
  });
}
