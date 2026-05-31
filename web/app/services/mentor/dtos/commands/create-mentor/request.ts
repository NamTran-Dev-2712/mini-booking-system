export interface CreateMentorRequest {
  fullName: string;
  email: string;
  phoneNumber: string;
  displayName?: string | null;
  bio?: string | null;
  specialization?: string | null;
  experienceYears: number;
  basePrice: number;
  avatarUrl?: string | null;
  facebookUrl?: string | null;
  githubUrl?: string | null;
  linkedInUrl?: string | null;
  telegramUrl?: string | null;
  websiteUrl?: string | null;
}
