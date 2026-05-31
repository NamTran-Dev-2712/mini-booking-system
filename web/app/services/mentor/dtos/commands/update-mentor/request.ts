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
  facebookUrl?: string | null;
  githubUrl?: string | null;
  linkedInUrl?: string | null;
  telegramUrl?: string | null;
  websiteUrl?: string | null;
}
