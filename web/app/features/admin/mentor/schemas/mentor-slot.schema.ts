import { z } from "zod";

export const mentorSlotSchema = z
  .object({
    name: z
      .string()
      .min(1, "Name is required")
      .max(200, "Name cannot exceed 200 characters"),
    startTime: z.string().min(1, "Start time is required"),
    endTime: z.string().min(1, "End time is required"),
    price: z
      .number({ error: "Price must be a number" })
      .min(0, "Price must not be negative"),
    maxBookings: z
      .number({ error: "Max bookings must be a number" })
      .int("Max bookings must be an integer")
      .min(1, "Max bookings must be at least 1"),
    description: z
      .string()
      .max(1000, "Description must not exceed 1000 characters")
      .optional()
      .or(z.literal("")),
  })
  .superRefine((data, ctx) => {
    const start = new Date(data.startTime);
    const end = new Date(data.endTime);
    const now = new Date();

    if (isNaN(start.getTime())) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Invalid start time",
        path: ["startTime"],
      });
      return;
    }

    if (isNaN(end.getTime())) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Invalid end time",
        path: ["endTime"],
      });
      return;
    }

    if (start <= now) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Start time must be in the future",
        path: ["startTime"],
      });
    }

    if (end <= start) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "End time must be after start time",
        path: ["endTime"],
      });
      return;
    }

    const durationMinutes = (end.getTime() - start.getTime()) / 60_000;

    if (durationMinutes < 30) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Slot duration must be at least 30 minutes",
        path: ["endTime"],
      });
    }

    if (durationMinutes > 12 * 60) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Slot duration must not exceed 12 hours",
        path: ["endTime"],
      });
    }
  });

export type MentorSlotFormData = z.infer<typeof mentorSlotSchema>;
