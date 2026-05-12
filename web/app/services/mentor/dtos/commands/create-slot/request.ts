export interface CreateSlotRequest {
  mentorId: string;
  startTime: string; // ISO string
  endTime: string; // ISO string
  description?: string | null;
  maxBookings: number;
  price: number;
}
