/**
 * Frontend types for the Mentor domain.
 * Mirror BE DTOs exactly so no mapping is needed.
 */

export type SlotStatus = "Available" | "Booked" | "Cancelled" | "Completed";

export interface Mentor {
  id: string;
  userId: string;
  displayName: string;
  email: string;
  phoneNumber?: string | null;
  bio: string | null;
  specialization: string | null;
  experienceYears: number;
  basePrice: number;
  avatarUrl: string | null;
  isActive: boolean;
  createdAt: string; // ISO string
}

export interface MentorSkill {
  id: string;
  skillName: string;
}

export interface MentorSlot {
  id: string;
  startTime: string; // ISO string
  endTime: string; // ISO string
  status: SlotStatus;
  price: number;
  description?: string | null;
  maxBookings: number;
  currentBookings: number;
}

export interface MentorDetail extends Mentor {
  skills: MentorSkill[];
  slots: MentorSlot[];
}
