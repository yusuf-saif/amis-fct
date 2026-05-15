import { DuesStatus, SchoolLevel, SchoolStatus, type Notification, type School } from "@prisma/client";

import { getCurrentDuesSetting } from "@/lib/dues";
import { prisma } from "@/lib/db";

export const NOTIFICATION_AUDIENCE_TYPES = ["ALL", "AREA_COUNCIL", "SCHOOL_LEVEL", "DUES_STATUS", "INDIVIDUAL"] as const;

export type NotificationAudienceFilters = {
  audienceType: (typeof NOTIFICATION_AUDIENCE_TYPES)[number];
  areaCouncils?: string[];
  schoolLevels?: SchoolLevel[];
  duesStatuses?: DuesStatus[];
  schoolIds?: string[];
};

export function buildAudienceDescription(filters: NotificationAudienceFilters) {
  switch (filters.audienceType) {
    case "ALL":
      return "All approved schools";
    case "AREA_COUNCIL":
      return `Area Council: ${(filters.areaCouncils ?? []).join(", ")}`;
    case "SCHOOL_LEVEL":
      return `School Level: ${(filters.schoolLevels ?? []).join(", ")}`;
    case "DUES_STATUS":
      return `Dues Status: ${(filters.duesStatuses ?? []).join(", ")}`;
    case "INDIVIDUAL":
      return `Individual Schools: ${(filters.schoolIds ?? []).length} selected`;
  }
}

export async function resolveNotificationRecipients(filters: NotificationAudienceFilters) {
  const currentDuesSetting = await getCurrentDuesSetting();

  if (filters.audienceType === "DUES_STATUS" && !currentDuesSetting) {
    return [] as Array<Pick<School, "id" | "name" | "email" | "areaCouncil" | "level">>;
  }

  return prisma.school.findMany({
    where: {
      status: SchoolStatus.APPROVED,
      ...(filters.audienceType === "AREA_COUNCIL" && filters.areaCouncils?.length ? { areaCouncil: { in: filters.areaCouncils } } : {}),
      ...(filters.audienceType === "SCHOOL_LEVEL" && filters.schoolLevels?.length ? { level: { in: filters.schoolLevels } } : {}),
      ...(filters.audienceType === "INDIVIDUAL" && filters.schoolIds?.length ? { id: { in: filters.schoolIds } } : {}),
      ...(filters.audienceType === "DUES_STATUS" && filters.duesStatuses?.length && currentDuesSetting
        ? {
            duesRecords: {
              some: {
                academicYear: currentDuesSetting.academicYear,
                status: { in: filters.duesStatuses },
              },
            },
          }
        : {}),
    },
    select: {
      id: true,
      name: true,
      email: true,
      areaCouncil: true,
      level: true,
    },
    orderBy: { name: "asc" },
  });
}

export function isDraftNotification(notification: Pick<Notification, "status">) {
  return notification.status === "DRAFT";
}
