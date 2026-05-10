import type { AxiosResponse } from "axios";
import apiClient from "~/lib/axios.config";
import type { ApiResponse } from "~/types/global/api.response";
import type { LoginRequest } from "./dtos/commands/login/login.request";
import type { LoginResponse } from "./dtos/commands/login/login.response";
import type { RegisterRequest } from "./dtos/commands/register/register.request";
import type { RegisterResponse } from "./dtos/commands/register/register.response";
import type { ProfileResponse } from "./dtos/queries/profile/profile.response";

export const authService = {
  async login(data: LoginRequest): Promise<LoginResponse> {
    const res: AxiosResponse<ApiResponse<LoginResponse>> = await apiClient.post(
      "/api/auth/login",
      data,
    );
    return res.data.data!;
  },

  async register(data: RegisterRequest): Promise<RegisterResponse> {
    const res: AxiosResponse<ApiResponse<RegisterResponse>> =
      await apiClient.post("/api/auth/register", data);
    return res.data.data!;
  },

  async getProfile(): Promise<ProfileResponse> {
    const res: AxiosResponse<ApiResponse<ProfileResponse>> =
      await apiClient.get("/api/auth/profile");
    return res.data.data!;
  },

  async logout(): Promise<void> {
    await apiClient.post("/api/auth/logout");
  },

  async refresh(): Promise<LoginResponse> {
    const res: AxiosResponse<ApiResponse<LoginResponse>> =
      await apiClient.post("/api/auth/refresh");
    return res.data.data!;
  },
};
