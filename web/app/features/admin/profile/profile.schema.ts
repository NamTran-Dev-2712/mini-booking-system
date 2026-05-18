import { z } from "zod";

const vietnameseFullName = /^[\p{L}]+(?:\s[\p{L}]+)*$/u;
const vietnamesePhone = /^(0|\+84|84)(3|5|7|8|9)\d{8}$/;

export const adminProfileSchema = z.object({
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
  avatarUrl: z
    .string()
    .max(500, "URL must not exceed 500 characters")
    .refine(
      (val) =>
        !val || val.startsWith("/uploads/") || /^https?:\/\/.+/.test(val),
      "Must be a valid URL",
    )
    .optional()
    .or(z.literal("")),
});

export type AdminProfileFormData = z.infer<typeof adminProfileSchema>;
