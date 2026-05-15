import { z } from "zod";

const phoneRegex = /^\+?[0-9\s()-]{7,20}$/;

export const contactEnquirySchema = z.object({
  fullName: z.string().trim().min(3).max(120),
  email: z.string().trim().email().toLowerCase(),
  phone: z.string().trim().regex(phoneRegex, "Enter a valid phone number.").optional().or(z.literal("")),
  subject: z.enum(["General Enquiry", "School Admissions", "School Membership", "Partnership", "Media Enquiry", "Website Feedback"]),
  message: z.string().trim().min(20).max(2000),
  ndprConsent: z.literal(true),
});
