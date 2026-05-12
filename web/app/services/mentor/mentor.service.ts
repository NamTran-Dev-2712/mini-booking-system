import type { AxiosResponse } from "axios";
import apiClient from "~/lib/axios.config";
import type { ApiResponse } from "~/types/global/api.response";
import type { PaginatedResult } from "~/types/global/paginated";
import type { Mentor, MentorDetail } from "~/types/mentor/mentor";
import type { AddSkillRequest } from "./dtos/commands/add-skill/request";
import type { AddSkillResponse } from "./dtos/commands/add-skill/response";
import type { CreateMentorRequest } from "./dtos/commands/create-mentor/request";
import type { CreateMentorResponse } from "./dtos/commands/create-mentor/response";
import type { CreateSlotRequest } from "./dtos/commands/create-slot/request";
import type { CreateSlotResponse } from "./dtos/commands/create-slot/response";
import type { UpdateMentorRequest } from "./dtos/commands/update-mentor/request";
import type { UpdateMentorResponse } from "./dtos/commands/update-mentor/response";
import type { UpdateSlotRequest } from "./dtos/commands/update-slot/request";
import type { UpdateSlotResponse } from "./dtos/commands/update-slot/response";
import type { GetMentorsRequest } from "./dtos/queries/get-mentors/request";

export const mentorService = {
  // ── Queries ────────────────────────────────────────────────────────────────

  async getMentors(
    params: GetMentorsRequest = {},
  ): Promise<PaginatedResult<Mentor>> {
    const res: AxiosResponse<ApiResponse<PaginatedResult<Mentor>>> =
      await apiClient.get("/api/Mentor", { params });
    return res.data.data!;
  },

  async getMentorDetail(id: string): Promise<MentorDetail> {
    const res: AxiosResponse<ApiResponse<MentorDetail>> = await apiClient.get(
      `/api/Mentor/${id}`,
    );
    return res.data.data!;
  },

  // ── Commands ───────────────────────────────────────────────────────────────

  async createMentor(body: CreateMentorRequest): Promise<CreateMentorResponse> {
    const res: AxiosResponse<ApiResponse<string>> = await apiClient.post(
      "/api/Mentor",
      body,
    );
    // BE returns the new Guid as the data field
    return { id: res.data.data! };
  },

  async updateMentor(
    id: string,
    body: Omit<UpdateMentorRequest, "id">,
  ): Promise<UpdateMentorResponse> {
    const res: AxiosResponse<ApiResponse<string>> = await apiClient.put(
      `/api/Mentor/${id}`,
      { ...body, id },
    );
    return { id: res.data.data! };
  },

  async deleteMentor(id: string): Promise<void> {
    await apiClient.delete(`/api/Mentor/${id}`);
  },

  async addSkill(
    mentorId: string,
    body: Omit<AddSkillRequest, "mentorId">,
  ): Promise<AddSkillResponse> {
    const res: AxiosResponse<ApiResponse<string>> = await apiClient.post(
      `/api/Mentor/${mentorId}/skills`,
      { ...body, mentorId },
    );
    return { id: res.data.data! };
  },

  async removeSkill(mentorId: string, skillId: string): Promise<void> {
    await apiClient.delete(`/api/Mentor/${mentorId}/skills/${skillId}`);
  },

  async createSlot(
    mentorId: string,
    body: Omit<CreateSlotRequest, "mentorId">,
  ): Promise<CreateSlotResponse> {
    const res: AxiosResponse<ApiResponse<string>> = await apiClient.post(
      `/api/Mentor/${mentorId}/slots`,
      { ...body, mentorId },
    );
    return { id: res.data.data! };
  },

  async updateSlot(
    mentorId: string,
    slotId: string,
    body: Omit<UpdateSlotRequest, "id" | "mentorId">,
  ): Promise<UpdateSlotResponse> {
    const res: AxiosResponse<ApiResponse<string>> = await apiClient.put(
      `/api/Mentor/${mentorId}/slots/${slotId}`,
      { ...body, id: slotId, mentorId },
    );
    return { id: res.data.data! };
  },
};
