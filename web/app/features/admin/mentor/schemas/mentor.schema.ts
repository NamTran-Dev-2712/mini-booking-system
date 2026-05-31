import { z } from "zod";
import { mentorSocialSchemaShape } from "~/components/shared/mentor/social-links";

// Vietnamese full name: letters (including diacritics) and spaces only
const vietnameseNameRegex = /^[a-zA-ZÀ-ỹÀ-ɏḀ-ỿ\s]+$/u;

// Vietnamese phone: 0[3|5|7|8|9] followed by 8 digits
const vietnamesePhoneRegex = /^(0[35789]\d{8})$/;

// URL validation
const urlRegex = /^https?:\/\/.+/;

// ── Create Mentor ──────────────────────────────────────────────────────────

export const createMentorSchema = z
  .object({
    fullName: z
      .string()
      .min(1, "Full name is required")
      .max(100, "Full name must not exceed 100 characters")
      .regex(
        vietnameseNameRegex,
        "Full name must contain only Vietnamese letters and spaces",
      ),

    email: z.string().min(1, "Email is required").email("Invalid email format"),

    phoneNumber: z
      .string()
      .min(1, "Phone number is required")
      .regex(
        vietnamesePhoneRegex,
        "Phone number must be a valid Vietnamese phone number",
      ),

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

    specialization: z.string().optional().or(z.literal("")),

    experienceYears: z
      .number({ error: "Experience years must be a number" })
      .int("Experience years must be an integer")
      .min(0, "Experience years must be at least 0")
      .max(50, "Experience years must not exceed 50"),

    basePrice: z
      .number({ error: "Base price must be a number" })
      .min(0, "Base price must not be negative"),

    avatarUrl: z
      .string()
      .refine(
        (val) =>
          !val || val.startsWith("/uploads/") || /^https?:\/\/.+/.test(val),
        "Invalid avatar URL",
      )
      .optional()
      .or(z.literal("")),

    ...mentorSocialSchemaShape,
  })
  .superRefine((data, ctx) => {
    if (
      data.experienceYears > 0 &&
      (!data.specialization || data.specialization.trim() === "")
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Specialization is required when experience years > 0",
        path: ["specialization"],
      });
    }
  });

export type CreateMentorFormData = z.infer<typeof createMentorSchema>;

// ── Update Mentor ──────────────────────────────────────────────────────────

export const updateMentorSchema = z.object({
  fullName: z
    .string()
    .max(100, "Full name must not exceed 100 characters")
    .regex(
      vietnameseNameRegex,
      "Full name must contain only Vietnamese letters and spaces",
    )
    .optional()
    .or(z.literal("")),

  phoneNumber: z
    .string()
    .regex(
      vietnamesePhoneRegex,
      "Phone number must be a valid Vietnamese phone number",
    )
    .optional()
    .or(z.literal("")),

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

  specialization: z.string().optional().or(z.literal("")),

  experienceYears: z
    .number({ error: "Experience years must be a number" })
    .int()
    .min(0)
    .max(50)
    .optional(),

  basePrice: z
    .number({ error: "Base price must be a number" })
    .min(0, "Base price must not be negative")
    .optional(),

  avatarUrl: z
    .string()
    .regex(urlRegex, "Invalid avatar URL")
    .optional()
    .or(z.literal("")),

  ...mentorSocialSchemaShape,
});

export type UpdateMentorFormData = z.infer<typeof updateMentorSchema>;
