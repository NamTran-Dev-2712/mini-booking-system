export interface RegisterMentorRequest {
  fullName: string;
  email: string;
  password: string;
  phoneNumber: string;
  avatarUrl?: string | null;
}
