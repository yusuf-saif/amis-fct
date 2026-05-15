import { NextResponse } from "next/server";
import { AdminRole } from "@prisma/client";

import { writeAuditLog } from "@/lib/audit-log";
import { getCurrentAdminUser } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function POST(request: Request, context: { params: Promise<{ id: string }> }) {
  const adminUser = await getCurrentAdminUser();
  if (!adminUser || adminUser.role !== AdminRole.SUPER_ADMIN) return NextResponse.redirect(new URL("/admin/login?error=session_expired", request.url), 303);
  const { id } = await context.params;
  const formData = await request.formData();
  const intent = String(formData.get("intent") ?? "update");

  if (intent === "delete") {
    await prisma.adminUser.delete({ where: { id } });
    await writeAuditLog({ actorAdminUserId: adminUser.id, action: "ADMIN_USER_DELETE", entityType: "AdminUser", entityId: id });
    return NextResponse.redirect(new URL("/admin/users?feedback=user-deleted", request.url), 303);
  }

  if (intent === "activate" || intent === "deactivate") {
    const isActive = intent === "activate";
    await prisma.adminUser.update({ where: { id }, data: { isActive } });
    await writeAuditLog({ actorAdminUserId: adminUser.id, action: isActive ? "ADMIN_USER_ACTIVATE" : "ADMIN_USER_DEACTIVATE", entityType: "AdminUser", entityId: id });
    return NextResponse.redirect(new URL("/admin/users?feedback=user-status-updated", request.url), 303);
  }

  const updated = await prisma.adminUser.update({
    where: { id },
    data: {
      name: String(formData.get("name") ?? ""),
      role: String(formData.get("role") ?? AdminRole.EDITOR) as AdminRole,
    },
  });
  await writeAuditLog({ actorAdminUserId: adminUser.id, action: "ADMIN_USER_UPDATE", entityType: "AdminUser", entityId: id, metadata: { role: updated.role } });
  return NextResponse.redirect(new URL("/admin/users?feedback=user-updated", request.url), 303);
}
