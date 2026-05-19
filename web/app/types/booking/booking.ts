export const BookingStatus = {
  PendingPayment: 1,
  Confirmed: 2,
  Cancelled: 3,
  Completed: 4,
  Expired: 5,
} as const;

export type BookingStatusValue =
  (typeof BookingStatus)[keyof typeof BookingStatus];

export const BOOKING_STATUS_LABEL: Record<BookingStatusValue, string> = {
  [BookingStatus.PendingPayment]: "Pending Payment",
  [BookingStatus.Confirmed]: "Confirmed",
  [BookingStatus.Cancelled]: "Cancelled",
  [BookingStatus.Completed]: "Completed",
  [BookingStatus.Expired]: "Expired",
};

export interface BookingMentorSlot {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  status: number;
  price: number;
  maxBookings: number;
  currentBookings: number;
}

export interface BookingMentor {
  id: string;
  userId: string;
  displayName: string;
  email: string;
  bio: string | null;
  specialization: string | null;
  experienceYears: number;
  basePrice: number;
  avatarUrl: string | null;
  isActive: boolean;
  createdAt: string;
}

export interface Booking {
  id: string;
  userId: string;
  bookingCode: string;
  mentorSlot: BookingMentorSlot;
  mentor: BookingMentor;
  status: BookingStatusValue;
  cancellationReason?: string | null;
  createdAt: string;
  updatedAt?: string | null;
}

export interface GetUserBookingsRequest {
  pageNumber?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: string;
  searchTerm?: string;
  status?: BookingStatusValue;
}
