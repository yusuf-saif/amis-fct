import { SchoolArm, SchoolLevel, SchoolStatus } from "@prisma/client";
import { z } from "zod";

import { AREA_COUNCILS } from "@/lib/schools";

const currentYear = new Date().getFullYear();

const phoneRegex = /^\+?[0-9\s()-]{7,20}$/;
const emptyToUndefined = <T extends z.ZodTypeAny>(schema: T) => z.preprocess((value) => (value === "" ? undefined : value), schema);

export const schoolRegistrationSchema = z.object({
  schoolName: z.string().trim().min(3).max(120),
  areaCouncil: z.enum(AREA_COUNCILS),
  arms: z.array(z.nativeEnum(SchoolArm))
    .min(1),
  principalName: z.string().trim().min(3).max(120),
  email: z.string().trim().email().toLowerCase(),
  phone: z.string().trim().regex(phoneRegex, "Enter a valid phone number."),
  address: z.string().trim().min(10).max(250),
  yearEstablished: z.coerce.number().int().min(1900).max(currentYear),
  description: z.string().trim().min(20).refine((value) => value.split(/\s+/).filter(Boolean).length <= 300, "Short description must be 300 words or fewer."),
  ndprConsent: z.literal(true),
  honeypot: z.string().optional(),
});

export const schoolDirectoryQuerySchema = z.object({
  search: emptyToUndefined(z.string().trim().max(120).optional()),
  areaCouncil: emptyToUndefined(z.enum(AREA_COUNCILS).optional()),
  level: emptyToUndefined(z.nativeEnum(SchoolLevel).optional()),
});

export const adminSchoolListQuerySchema = z.object({
  search: emptyToUndefined(z.string().trim().max(120).optional()),
  areaCouncil: emptyToUndefined(z.enum(AREA_COUNCILS).optional()),
  status: emptyToUndefined(z.nativeEnum(SchoolStatus).optional()),
});

export const adminSchoolUpdateSchema = z.object({
  schoolName: z.string().trim().min(3).max(120),
  areaCouncil: z.enum(AREA_COUNCILS),
  arms: z.array(z.nativeEnum(SchoolArm))
    .min(1),
  principalName: z.string().trim().min(3).max(120),
  email: z.string().trim().email().toLowerCase(),
  phone: z.string().trim().regex(phoneRegex, "Enter a valid phone number."),
  address: z.string().trim().min(10).max(250),
  yearEstablished: z.coerce.number().int().min(1900).max(currentYear),
  description: z.string().trim().min(20).refine((value) => value.split(/\s+/).filter(Boolean).length <= 300, "Short description must be 300 words or fewer."),
  arabicName: z.string().trim().max(120).optional().or(z.literal("")),
  googleMapUrl: z.string().trim().url().optional().or(z.literal("")),
});

export const adminMessageSchema = z.object({
  message: z.string().trim().min(10).max(1000),
});

export const adminRejectSchema = z.object({
  rejectionReason: z.string().trim().min(10).max(1000),
});
