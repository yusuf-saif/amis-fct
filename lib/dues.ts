import { DuesStatus, DuesTier, SchoolArm } from "@prisma/client";

import { writeAuditLog } from "@/lib/audit-log";
import { prisma } from "@/lib/db";

export const ACTIVE_MEMBER_BADGE_SETTING_KEY = "PUBLIC_ACTIVE_MEMBER_BADGE_ENABLED";
export const ACADEMIC_YEAR_REGEX = /^\d{4}\/\d{4}$/;

export function isAcademicYear(value: string) {
  return ACADEMIC_YEAR_REGEX.test(value) && Number(value.slice(5)) === Number(value.slice(0, 4)) + 1;
}

export function deriveDuesTier(arms: SchoolArm[] | null | undefined): DuesTier {
  const safeArms = Array.isArray(arms) ? arms : [];

  if (safeArms.includes(SchoolArm.SSS)) {
    return DuesTier.TIER_4;
  }

  if (safeArms.includes(SchoolArm.JSS)) {
    return DuesTier.TIER_3;
  }

  if (safeArms.includes(SchoolArm.PRIMARY)) {
    return DuesTier.TIER_2;
  }

  return DuesTier.TIER_1;
}

export function getDuesTierLabel(tier: DuesTier) {
  switch (tier) {
    case DuesTier.TIER_1:
      return "Tier 1";
    case DuesTier.TIER_2:
      return "Tier 2";
    case DuesTier.TIER_3:
      return "Tier 3";
    case DuesTier.TIER_4:
      return "Tier 4";
  }
}

export function getTierAmount(setting: { tier1Amount: number; tier2Amount: number; tier3Amount: number; tier4Amount: number }, tier: DuesTier) {
  switch (tier) {
    case DuesTier.TIER_1:
      return setting.tier1Amount;
    case DuesTier.TIER_2:
      return setting.tier2Amount;
    case DuesTier.TIER_3:
      return setting.tier3Amount;
    case DuesTier.TIER_4:
      return setting.tier4Amount;
  }
}

export function normalizePaymentStatus(amountPaid: number, annualAmount: number) {
  if (amountPaid <= 0) {
    return DuesStatus.UNPAID;
  }

  if (amountPaid >= annualAmount) {
    return DuesStatus.PAID;
  }

  return DuesStatus.PARTIAL;
}

export function computeBalance(annualAmount: number, amountPaid: number) {
  return Math.max(0, annualAmount - amountPaid);
}

export async function getCurrentDuesSetting() {
  return prisma.duesTierSetting.findFirst({ where: { isCurrent: true } });
}

export async function getBadgeVisibilityEnabled() {
  const setting = await prisma.appSetting.findUnique({ where: { key: ACTIVE_MEMBER_BADGE_SETTING_KEY } });
  return setting?.value === true;
}

export function isSchoolActiveMember(
  duesRecords: Array<{ academicYear: string; status: DuesStatus }>,
  currentAcademicYear: string | null,
  badgeVisible: boolean,
) {
  if (!badgeVisible || !currentAcademicYear) {
    return false;
  }

  return duesRecords.some((record) => record.academicYear === currentAcademicYear && record.status === DuesStatus.PAID);
}

export async function setCurrentAcademicYear(settingId: string, actorAdminUserId: string) {
  await prisma.$transaction(async (tx) => {
    await tx.duesTierSetting.updateMany({ data: { isCurrent: false } });
    const updated = await tx.duesTierSetting.update({ where: { id: settingId }, data: { isCurrent: true } });
    await tx.appSetting.upsert({
      where: { key: ACTIVE_MEMBER_BADGE_SETTING_KEY },
      update: {},
      create: { key: ACTIVE_MEMBER_BADGE_SETTING_KEY, value: true },
    });
    await writeAuditLog({
      actorAdminUserId,
      action: "DUES_CURRENT_YEAR_UPDATE",
      entityType: "DuesTierSetting",
      entityId: updated.id,
      metadata: { academicYear: updated.academicYear },
    });
  });
}

export async function ensureDuesRecordsForAcademicYear(academicYear: string, actorAdminUserId?: string) {
  const setting = await prisma.duesTierSetting.findUnique({ where: { academicYear } });
  if (!setting) {
    return { created: 0 };
  }

  const schools = await prisma.school.findMany({
    where: { status: "APPROVED" },
    select: { id: true, arms: true },
  });

  let created = 0;

  for (const school of schools) {
    const tier = deriveDuesTier(school.arms);
    const amountDue = getTierAmount(setting, tier);
    const existing = await prisma.duesRecord.findUnique({
      where: {
        schoolId_academicYear: {
          schoolId: school.id,
          academicYear,
        },
      },
    });

    if (!existing) {
      const record = await prisma.duesRecord.create({
        data: {
          schoolId: school.id,
          academicYear,
          tier,
          amountDue,
          amountPaid: 0,
          status: DuesStatus.UNPAID,
        },
      });
      created += 1;

      if (actorAdminUserId) {
        await writeAuditLog({
          actorAdminUserId,
          action: "DUES_RECORD_INITIALIZE",
          entityType: "DuesRecord",
          entityId: record.id,
          metadata: { academicYear, schoolId: school.id },
        });
      }
      continue;
    }

    const normalizedStatus = normalizePaymentStatus(existing.amountPaid, amountDue);
    if (existing.tier !== tier || existing.amountDue !== amountDue || existing.status !== normalizedStatus) {
      await prisma.duesRecord.update({
        where: { id: existing.id },
        data: {
          tier,
          amountDue,
          status: normalizedStatus,
        },
      });
    }
  }

  return { created };
}

export function csvEscape(value: string | number | null | undefined) {
  const stringValue = value == null ? "" : String(value);
  return `"${stringValue.replaceAll("\"", "\"\"")}"`;
}
