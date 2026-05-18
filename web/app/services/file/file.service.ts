import type { AxiosResponse } from "axios";
import apiClient from "~/lib/axios.config";
import type { ApiResponse } from "~/types/global/api.response";

interface UploadAvatarResponse {
  avatarUrl: string;
}

export const fileService = {
  async uploadAvatar(file: File): Promise<UploadAvatarResponse> {
    const formData = new FormData();
    formData.append("file", file);

    const res: AxiosResponse<ApiResponse<UploadAvatarResponse>> =
      await apiClient.post("/api/auth/avatar", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

    return res.data.data!;
  },
};
