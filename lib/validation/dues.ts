import { DuesStatus, DuesTier } from "@prisma/client";
import { z } from "zod";

import { ACADEMIC_YEAR_REGEX } from "@/lib/dues";
import { AREA_COUNCILS } from "@/lib/schools";

const emptyToUndefined = <T extends z.ZodTypeAny>(schema: T) => z.preprocess((value) => (value === "" ? undefined : value), schema);

export const duesSettingSchema = z.object({
  academicYear: z.string().regex(ACADEMIC_YEAR_REGEX, "Academic year must be in YYYY/YYYY format."),
  tier1Amount: z.coerce.number().min(0),
  tier2Amount: z.coerce.number().min(0),
  tier3Amount: z.coerce.number().min(0),
  tier4Amount: z.coerce.number().min(0),
});

export const duesRecordUpdateSchema = z.object({
  academicYear: z.string().regex(ACADEMIC_YEAR_REGEX, "Academic year must be in YYYY/YYYY format."),
  amountPaid: z.coerce.number().min(0),
  paymentStatus: z.nativeEnum(DuesStatus).optional(),
  paymentDate: emptyToUndefined(z.string().optional()),
  notes: emptyToUndefined(z.string().trim().max(1000).optional()),
});

export const duesFilterSchema = z.object({
  academicYear: emptyToUndefined(z.string().regex(ACADEMIC_YEAR_REGEX).optional()),
  paymentStatus: emptyToUndefined(z.nativeEnum(DuesStatus).optional()),
  duesTier: emptyToUndefined(z.nativeEnum(DuesTier).optional()),
  areaCouncil: emptyToUndefined(z.enum(AREA_COUNCILS).optional()),
  search: emptyToUndefined(z.string().trim().max(120).optional()),
});
