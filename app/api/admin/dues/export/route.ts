import { NextResponse } from "next/server";
import { Prisma, SchoolStatus } from "@prisma/client";

import { writeAuditLog } from "@/lib/audit-log";
import { csvEscape, getDuesTierLabel } from "@/lib/dues";
import { getCurrentAdminUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { getSchoolArmLabel } from "@/lib/schools";
import { duesFilterSchema } from "@/lib/validation/dues";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const adminUser = await getCurrentAdminUser();
  if (!adminUser || adminUser.role !== "SUPER_ADMIN") {
    return NextResponse.redirect(new URL("/admin/login?error=session_expired", request.url), 303);
  }

  const url = new URL(request.url);
  const parsed = duesFilterSchema.safeParse(Object.fromEntries(url.searchParams.entries()));
  const filters = parsed.success ? parsed.data : {};

  const where: Prisma.DuesRecordWhereInput = {
    ...(filters.academicYear ? { academicYear: filters.academicYear } : {}),
    ...(filters.paymentStatus ? { status: filters.paymentStatus } : {}),
    ...(filters.duesTier ? { tier: filters.duesTier } : {}),
    school: {
      status: SchoolStatus.APPROVED,
      ...(filters.areaCouncil ? { areaCouncil: filters.areaCouncil } : {}),
      ...(filters.search ? { name: { contains: filters.search, mode: "insensitive" } } : {}),
    },
  };

  const records = await prisma.duesRecord.findMany({ where, include: { school: true }, orderBy: { school: { name: "asc" } } });
  const header = ["School Name", "Area Council", "Arms", "Dues Tier", "Annual Dues Amount", "Amount Paid", "Balance", "Payment Status", "Payment Date", "Academic Year"];
  const rows = records.map((record) => [
    record.school.name,
    record.school.areaCouncil,
    record.school.arms.map(getSchoolArmLabel).join(", "),
    getDuesTierLabel(record.tier),
    record.amountDue,
    record.amountPaid,
    Math.max(0, record.amountDue - record.amountPaid),
    record.status,
    record.paymentDate ? record.paymentDate.toISOString().slice(0, 10) : "",
    record.academicYear,
  ]);
  const csv = [header, ...rows].map((row) => row.map(csvEscape).join(",")).join("\n");

  await writeAuditLog({
    actorAdminUserId: adminUser.id,
    action: "DUES_CSV_EXPORT",
    entityType: "DuesRecord",
    metadata: { academicYear: filters.academicYear ?? null, rowCount: records.length },
  });

  const fileName = `amis-fct-dues-${(filters.academicYear ?? "all-years").replace("/", "-")}.csv`;
  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${fileName}"`,
    },
  });
}
