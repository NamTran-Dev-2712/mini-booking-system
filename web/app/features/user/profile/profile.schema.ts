import { z } from "zod";

const vietnameseFullName = /^[\p{L}]+(?:\s[\p{L}]+)*$/u;
const vietnamesePhone = /^(0|\+84|84)(3|5|7|8|9)\d{8}$/;

export const userProfileSchema = z.object({
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
});

export type UserProfileFormData = z.infer<typeof userProfileSchema>;
