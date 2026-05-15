import { DuesStatus, NotificationStatus, SchoolLevel } from "@prisma/client";
import { z } from "zod";

import { AREA_COUNCILS } from "@/lib/schools";

const emptyToUndefined = <T extends z.ZodTypeAny>(schema: T) => z.preprocess((value) => (value === "" ? undefined : value), schema);

export const notificationAudienceSchema = z
  .object({
    audienceType: z.enum(["ALL", "AREA_COUNCIL", "SCHOOL_LEVEL", "DUES_STATUS", "INDIVIDUAL"]),
    areaCouncils: z.array(z.enum(AREA_COUNCILS)).optional(),
    schoolLevels: z.array(z.nativeEnum(SchoolLevel)).optional(),
    duesStatuses: z.array(z.nativeEnum(DuesStatus)).optional(),
    schoolIds: z.array(z.string().cuid()).optional(),
  })
  .superRefine((value, ctx) => {
    if (value.audienceType === "AREA_COUNCIL" && (!value.areaCouncils || value.areaCouncils.length === 0)) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Select at least one Area Council." });
    }

    if (value.audienceType === "SCHOOL_LEVEL" && (!value.schoolLevels || value.schoolLevels.length === 0)) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Select at least one school level." });
    }

    if (value.audienceType === "DUES_STATUS" && (!value.duesStatuses || value.duesStatuses.length === 0)) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Select at least one dues status." });
    }

    if (value.audienceType === "INDIVIDUAL" && (!value.schoolIds || value.schoolIds.length === 0)) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Select at least one school." });
    }
  });

export const notificationFormSchema = z.object({
  title: z.string().trim().min(3).max(160),
  body: z.string().trim().min(10).max(5000),
  status: z.nativeEnum(NotificationStatus),
  scheduledFor: emptyToUndefined(z.string().datetime({ offset: true }).optional()),
});
