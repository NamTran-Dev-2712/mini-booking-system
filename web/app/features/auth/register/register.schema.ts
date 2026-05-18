import { z } from "zod";

// Matches BE's VietnamesePhoneNumber validation pattern
const VIETNAMESE_PHONE_REGEX =
  /^(0|\+84)(3[2-9]|5[25689]|7[06789]|8[1-9]|9[0-9])\d{7}$/;

export const registerSchema = z
  .object({
    fullName: z
      .string()
      .min(1, "Full name is required")
      .min(2, "Full name must be at least 2 characters"),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Invalid email address"),
    phoneNumber: z
      .string()
      .min(1, "Phone number is required")
      .regex(
        VIETNAMESE_PHONE_REGEX,
        "Phone number must be a valid Vietnamese phone number",
      ),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[^a-zA-Z0-9]/,
        "Password must contain at least one special character",
      ),
    confirmPassword: z.string().min(1, "Password confirmation is required"),
    avatarUrl: z.string().optional().or(z.literal("")),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;
