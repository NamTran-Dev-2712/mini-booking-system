import { z } from "zod";

const vietnameseFullName = /^[\p{L}]+(?:\s[\p{L}]+)*$/u;
const vietnamesePhone = /^(0|\+84|84)(3|5|7|8|9)\d{8}$/;

export const mentorProfileSchema = z.object({
  fullName: z
    .string()
    .min(1, "Full name is required")
    .max(100, "Full name must not exceed 100 characters")
    .regex(
      vietnameseFullName,
      "Full name must contain only letters and spaces",
    ),
  phoneNumber: z
    .string()
    .min(1, "Phone number is required")
    .regex(vietnamesePhone, "Must be a valid Vietnamese phone number"),
  displayName: z
    .string()
    .max(50, "Display name must not exceed 50 characters")
    .optional()
    .or(z.literal("")),
  bio: z
    .string()
    .max(1000, "Bio must not exceed 1000 characters")
    .optional()
    .or(z.literal("")),
  specialization: z
    .string()
    .max(200, "Specialization must not exceed 200 characters")
    .optional()
    .or(z.literal("")),
  experienceYears: z
    .number({ error: "Experience years must be a number" })
    .int("Must be an integer")
    .min(0, "Must be at least 0")
    .max(50, "Must be at most 50"),
  basePrice: z
    .number({ error: "Base price must be a number" })
    .min(0, "Must be at least 0"),
  avatarUrl: z
    .string()
    .url("Must be a valid URL")
    .max(500, "URL must not exceed 500 characters")
    .optional()
    .or(z.literal("")),
});

export type MentorProfileFormData = z.infer<typeof mentorProfileSchema>;
