/**
 * Frontend types for the Mentor domain.
 * Mirror BE DTOs exactly so no mapping is needed.
 */

export type SlotStatus = 1 | 2 | 3 | 4 | 5;

export const SLOT_STATUS = {
  Available: 1,
  FullyBooked: 2,
  Blocked: 3,
  Cancelled: 4,
  Completed: 5,
} as const;

export const SLOT_STATUS_LABEL: Record<number, string> = {
  1: "Available",
  2: "Fully Booked",
  3: "Blocked",
  4: "Cancelled",
  5: "Completed",
};

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
  name: string;
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
