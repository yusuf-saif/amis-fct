import path from "node:path";

import { DuesStatus, SchoolArm, SchoolLevel, SchoolStatus } from "@prisma/client";

import { prisma } from "@/lib/db";

export const AREA_COUNCILS = [
  "Abuja Municipal",
  "Bwari",
  "Gwagwalada",
  "Kuje",
  "Kwali",
  "Abaji",
] as const;

export const SCHOOL_ARM_OPTIONS = [SchoolArm.NURSERY, SchoolArm.PRIMARY, SchoolArm.JSS, SchoolArm.SSS] as const;

export const PUBLIC_SCHOOL_STATUSES = [SchoolStatus.APPROVED] as const;

export const ADMIN_SCHOOL_STATUS_TABS = [
  { label: "Pending", value: SchoolStatus.PENDING },
  { label: "Approved", value: SchoolStatus.APPROVED },
  { label: "More Info Requested", value: SchoolStatus.MORE_INFO_REQUESTED },
  { label: "Rejected", value: SchoolStatus.REJECTED },
] as const;

export function getSchoolStatusLabel(status: SchoolStatus) {
  switch (status) {
    case SchoolStatus.PENDING:
      return "Pending";
    case SchoolStatus.MORE_INFO_REQUESTED:
      return "More Info Requested";
    case SchoolStatus.APPROVED:
      return "Approved";
    case SchoolStatus.REJECTED:
      return "Rejected";
    case SchoolStatus.REMOVED:
      return "Removed";
  }
}

export function getAreaCouncilOptions() {
  return [...AREA_COUNCILS];
}

export function getSchoolArmLabel(arm: SchoolArm) {
  switch (arm) {
    case SchoolArm.NURSERY:
      return "Nursery";
    case SchoolArm.PRIMARY:
      return "Primary";
    case SchoolArm.JSS:
      return "JSS";
    case SchoolArm.SSS:
      return "SSS";
  }
}

export function getSchoolLevelLabel(level: SchoolLevel) {
  switch (level) {
    case SchoolLevel.PRIMARY:
      return "Primary";
    case SchoolLevel.SECONDARY:
      return "Secondary";
    case SchoolLevel.COMBINED:
      return "Both / Combined";
  }
}

export function deriveSchoolLevel(arms: SchoolArm[]) {
  const hasPrimary = arms.includes(SchoolArm.NURSERY) || arms.includes(SchoolArm.PRIMARY);
  const hasSecondary = arms.includes(SchoolArm.JSS) || arms.includes(SchoolArm.SSS);

  if (hasPrimary && hasSecondary) {
    return SchoolLevel.COMBINED;
  }

  if (hasSecondary) {
    return SchoolLevel.SECONDARY;
  }

  return SchoolLevel.PRIMARY;
}

export function deriveDuesTier(arms: SchoolArm[]) {
  if (arms.includes(SchoolArm.SSS)) {
    return "TIER_4";
  }

  if (arms.includes(SchoolArm.JSS)) {
    return "TIER_3";
  }

  if (arms.includes(SchoolArm.PRIMARY)) {
    return "TIER_2";
  }

  return "TIER_1";
}

export function slugifySchoolName(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

export async function generateUniqueSchoolSlug(name: string, excludeId?: string) {
  const base = slugifySchoolName(name) || "school";

  for (let counter = 0; counter < 100; counter += 1) {
    const candidate = counter === 0 ? base : `${base}-${counter + 1}`;
    const existing = await prisma.school.findFirst({
      where: {
        slug: candidate,
        ...(excludeId ? { NOT: { id: excludeId } } : {}),
      },
      select: { id: true },
    });

    if (!existing) {
      return candidate;
    }
  }

  return `${base}-${Date.now()}`;
}

export function getCurrentAcademicYear(date = new Date()) {
  const year = date.getMonth() >= 7 ? date.getFullYear() : date.getFullYear() - 1;
  return `${year}/${year + 1}`;
}

export function isSchoolActiveMember(duesRecords: Array<{ academicYear: string; status: DuesStatus }>) {
  const academicYear = getCurrentAcademicYear();
  return duesRecords.some((record) => record.academicYear === academicYear && record.status === DuesStatus.PAID);
}

export function resolveSchoolUploadDirectory() {
  return path.join(process.cwd(), "uploads", "schools");
}
