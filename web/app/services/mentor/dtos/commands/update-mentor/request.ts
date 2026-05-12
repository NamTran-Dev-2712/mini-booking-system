export interface UpdateMentorRequest {
  id: string;
  fullName?: string | null;
  phoneNumber?: string | null;
  displayName?: string | null;
  bio?: string | null;
  specialization?: string | null;
  experienceYears?: number | null;
  basePrice?: number | null;
  avatarUrl?: string | null;
}
