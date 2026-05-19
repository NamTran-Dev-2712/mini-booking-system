export interface UpdateSlotRequest {
  id: string;
  mentorId: string;
  name: string;
  startTime: string; // ISO string
  endTime: string; // ISO string
  price: number;
  description?: string | null;
  maxBookings: number;
}
