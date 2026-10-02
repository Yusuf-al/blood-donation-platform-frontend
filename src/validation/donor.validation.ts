import { z } from "zod";

const calculateAge = (dateOfBirth: string) => {
  const [year, month, day] = dateOfBirth.split("-").map(Number);

  const today = new Date();

  let age = today.getFullYear() - year;

  const currentMonth = today.getMonth() + 1;

  if (
    currentMonth < month ||
    (currentMonth === month && today.getDate() < day)
  ) {
    age--;
  }

  return age;
};

export const BloodGroupEnum = z.enum(
  ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
  "Please a Blood Group",
);

export const BecomeDonorZodSchema = z.object({
  bloodGroup: BloodGroupEnum,

  dateOfBirth: z
    .string()
    .min(1, "Date of birth is required.")
    .refine(
      (date) => /^\d{4}-\d{2}-\d{2}$/.test(date),
      "Please provide a valid date of birth.",
    )
    .refine((date) => {
      const birthDate = new Date(`${date}T00:00:00`);
      const today = new Date();

      return birthDate <= today;
    }, "Date of birth cannot be in the future.")
    .refine(
      (date) => calculateAge(date) >= 18,
      "You must be at least 18 years old to register as a donor.",
    ),

  city: z
    .string()
    .trim()
    .min(1, "City is required.")
    .max(100, "City must not exceed 100 characters."),

  address: z
    .string()
    .trim()
    .max(255, "Address must not exceed 255 characters."),

  lastDonationDate: z.string().refine((date) => {
    if (!date) return true;

    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return false;
    }

    const donationDate = new Date(`${date}T00:00:00`);
    const today = new Date();

    return donationDate <= today;
  }, "Last donation date cannot be in the future."),
});

export type BecomeDonorFormData = z.infer<typeof BecomeDonorZodSchema>;
