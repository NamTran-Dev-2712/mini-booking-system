import { z } from "zod";

export const resetPasswordSchema = z
  .object({
    email: z
      .string()
      .min(1, "Email is required")
      .email("Invalid email address"),
    token: z.string().min(1, "Reset token is required"),
    otpCode: z
      .string()
      .min(1, "OTP code is required")
      .length(6, "OTP code must be 6 digits")
      .regex(/^\d{6}$/, "OTP code must contain only digits"),
    newPassword: z
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
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
