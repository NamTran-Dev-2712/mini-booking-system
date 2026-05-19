import { z } from "zod";

const vietnamesePhoneRegex = /^(0[35789]\d{8})$/;

export const completeProfileSchema = z.object({
  phoneNumber: z
    .string()
    .min(1, "Phone number is required")
    .regex(
      vietnamesePhoneRegex,
      "Phone number must be a valid Vietnamese phone number",
    ),
});

export type CompleteProfileFormData = z.infer<typeof completeProfileSchema>;
