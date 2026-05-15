import { NextResponse } from "next/server";

import { writeAuditLog } from "@/lib/audit-log";
import { getCurrentAdminUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { deleteContentFileIfUnreferenced } from "@/lib/uploads";

export async function GET(request: Request) {
  return NextResponse.redirect(new URL("/admin/enquiries", request.url), 303);
}

export async function POST(request: Request, context: { params: Promise<{ id: string }> }) {
  const adminUser = await getCurrentAdminUser();
  if (!adminUser || adminUser.role !== "SUPER_ADMIN") return NextResponse.redirect(new URL("/admin/login?error=session_expired", request.url), 303);
  const { id } = await context.params;
  const enquiry = await prisma.contactEnquiry.findUnique({ where: { id } });
  if (!enquiry) return NextResponse.redirect(new URL("/admin/enquiries?feedback=missing-enquiry", request.url), 303);
  const formData = await request.formData();
  const intent = String(formData.get("intent") ?? "review");
  if (intent === "review") {
    await prisma.contactEnquiry.update({ where: { id }, data: { isRead: true } });
    await writeAuditLog({ actorAdminUserId: adminUser.id, action: "ENQUIRY_REVIEW", entityType: "ContactEnquiry", entityId: id });
    return NextResponse.redirect(new URL("/admin/enquiries?feedback=reviewed", request.url), 303);
  }
  await prisma.contactEnquiry.delete({ where: { id } });
  await deleteContentFileIfUnreferenced(enquiry.attachmentUrl);
  await writeAuditLog({ actorAdminUserId: adminUser.id, action: "ENQUIRY_DELETE", entityType: "ContactEnquiry", entityId: id });
  return NextResponse.redirect(new URL("/admin/enquiries?feedback=deleted", request.url), 303);
}
