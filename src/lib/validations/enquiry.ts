import { z } from "zod";
import { LEVELS, MODES } from "@/lib/constants";

/**
 * The admission enquiry, validated once and shared by the form,
 * the server action and (mirrored there) the Convex mutation.
 */
export const enquirySchema = z.object({
  name: z.string().trim().min(2, "Write the full name.").max(100),
  phone: z
    .string()
    .trim()
    .regex(/^[6-9]\d{9}$/, "A ten-digit Indian mobile number, without the country code."),
  email: z
    .union([z.literal(""), z.string().trim().email("That address looks incomplete.")])
    .optional(),
  interestedLevel: z.enum(LEVELS),
  learningMode: z.enum(MODES),
  education: z.string().trim().max(120).optional(),
  message: z.string().trim().max(1000).optional(),
  preferredContactTime: z.string().trim().max(60).optional(),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;
