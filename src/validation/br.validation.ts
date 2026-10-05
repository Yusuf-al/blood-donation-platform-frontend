import { z } from "zod";

export const BloodRequestZodSchema = z.object({
  bloodGroup: z.string().min(1, "Select a blood group"),
  requiredUnits: z
    .number()
    .min(1, "At least 1 unit is required")
    .max(20, "Maximum 20 units"),
  hospitalName: z.string().trim().min(2, "Enter the hospital name"),
  hospitalLocation: z.string().trim().min(3, "Enter the hospital address"),
  contactPhone: z
    .string()
    .trim()
    .regex(
      /^(?:\+?88)?01[3-9]\d{8}$/,
      "Enter a valid Bangladeshi phone number",
    ),
  urgency: z.string().min(1, "Select how urgent the request is"),
  requiredAt: z.string().min(1, "Select the date blood is needed"),
  description: z.string().max(1000),
});
