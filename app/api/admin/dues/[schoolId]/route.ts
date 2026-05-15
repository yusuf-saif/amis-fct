import { NextResponse } from "next/server";
import { SchoolStatus } from "@prisma/client";

import { writeAuditLog } from "@/lib/audit-log";
import { computeBalance, ensureDuesRecordsForAcademicYear, normalizePaymentStatus } from "@/lib/dues";
import { getCurrentAdminUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { duesRecordUpdateSchema } from "@/lib/validation/dues";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request, context: { params: Promise<{ schoolId: string }> }) {
  const { schoolId } = await context.params;
  return NextResponse.redirect(new URL(`/admin/dues/${schoolId}`, request.url), 303);
}

export async function POST(request: Request, context: { params: Promise<{ schoolId: string }> }) {
  const adminUser = await getCurrentAdminUser();
  if (!adminUser || adminUser.role !== "SUPER_ADMIN") {
    return NextResponse.redirect(new URL("/admin/login?error=session_expired", request.url), 303);
  }

  const { schoolId } = await context.params;
  const formData = await request.formData();
  const parsed = duesRecordUpdateSchema.safeParse({
    academicYear: formData.get("academicYear"),
    amountPaid: formData.get("amountPaid"),
    paymentDate: formData.get("paymentDate"),
    notes: formData.get("notes"),
  });

  if (!parsed.success) {
    return NextResponse.redirect(new URL(`/admin/dues/${schoolId}?feedback=invalid-dues-record&academicYear=${encodeURIComponent(String(formData.get("academicYear") ?? ""))}`, request.url), 303);
  }

  const school = await prisma.school.findUnique({ where: { id: schoolId } });
  if (!school || school.status !== SchoolStatus.APPROVED) {
    return NextResponse.redirect(new URL("/admin/dues?feedback=invalid-school", request.url), 303);
  }

  await ensureDuesRecordsForAcademicYear(parsed.data.academicYear);
  const record = await prisma.duesRecord.findUnique({ where: { schoolId_academicYear: { schoolId, academicYear: parsed.data.academicYear } } });
  if (!record) {
    return NextResponse.redirect(new URL("/admin/dues?feedback=missing-record", request.url), 303);
  }

  const amountPaid = parsed.data.amountPaid;
  const status = normalizePaymentStatus(amountPaid, record.amountDue);
  const paymentDate = parsed.data.paymentDate ? new Date(parsed.data.paymentDate) : null;
  const updated = await prisma.duesRecord.update({
    where: { id: record.id },
    data: {
      amountPaid,
      status,
      paymentDate,
      notes: parsed.data.notes || null,
    },
  });

  await writeAuditLog({
    actorAdminUserId: adminUser.id,
    action: "DUES_PAYMENT_UPDATE",
    entityType: "DuesRecord",
    entityId: updated.id,
    metadata: {
      schoolId,
      academicYear: parsed.data.academicYear,
      amountPaid,
      balance: computeBalance(updated.amountDue, amountPaid),
      status,
    },
  });

  return NextResponse.redirect(new URL(`/admin/dues/${schoolId}?feedback=payment-updated&academicYear=${encodeURIComponent(parsed.data.academicYear)}`, request.url), 303);
}
