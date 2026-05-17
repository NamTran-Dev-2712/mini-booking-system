import type { AxiosResponse } from "axios";
import apiClient from "~/lib/axios.config";
import type { ApiResponse } from "~/types/global/api.response";
import type {
  AdminDashboardResponse,
  MentorDashboardResponse,
  UserDashboardResponse,
} from "./dashboard.types";

export const dashboardService = {
  async getAdminDashboard(months = 6): Promise<AdminDashboardResponse> {
    const res: AxiosResponse<ApiResponse<AdminDashboardResponse>> =
      await apiClient.get("/api/dashboard/admin", { params: { months } });
    return res.data.data!;
  },

  async getMentorDashboard(months = 6): Promise<MentorDashboardResponse> {
    const res: AxiosResponse<ApiResponse<MentorDashboardResponse>> =
      await apiClient.get("/api/dashboard/mentor", { params: { months } });
    return res.data.data!;
  },

  async getUserDashboard(months = 6): Promise<UserDashboardResponse> {
    const res: AxiosResponse<ApiResponse<UserDashboardResponse>> =
      await apiClient.get("/api/dashboard/user", { params: { months } });
    return res.data.data!;
  },
};
