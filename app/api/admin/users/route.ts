import { NextResponse } from "next/server";
import { AdminRole } from "@prisma/client";

import { writeAuditLog } from "@/lib/audit-log";
import { getCurrentAdminUser, hashPassword } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function POST(request: Request) {
  const adminUser = await getCurrentAdminUser();
  if (!adminUser || adminUser.role !== AdminRole.SUPER_ADMIN) return NextResponse.redirect(new URL("/admin/login?error=session_expired", request.url), 303);
  const formData = await request.formData();
  const passwordHash = await hashPassword(String(formData.get("password") ?? ""));
  const user = await prisma.adminUser.create({
    data: {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? "").toLowerCase(),
      role: String(formData.get("role") ?? AdminRole.EDITOR) as AdminRole,
      passwordHash,
    },
  });
  await writeAuditLog({ actorAdminUserId: adminUser.id, action: "ADMIN_USER_CREATE", entityType: "AdminUser", entityId: user.id, metadata: { role: user.role } });
  return NextResponse.redirect(new URL("/admin/users?feedback=user-created", request.url), 303);
}
