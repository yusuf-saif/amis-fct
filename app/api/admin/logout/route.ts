import { NextResponse } from "next/server";

import { clearSessionCookie, getCurrentAdminSession } from "@/lib/auth";
import { writeAuditLog } from "@/lib/audit-log";
import { prisma } from "@/lib/db";

export async function POST(request: Request) {
  const session = await getCurrentAdminSession();

  if (session) {
    await prisma.adminSession.delete({ where: { id: session.id } });
    await writeAuditLog({
      action: "LOGOUT",
      actorAdminUserId: session.adminUserId,
      entityType: "AdminSession",
      entityId: session.id,
    });
  }

  const response = NextResponse.redirect(new URL("/admin/login", request.url), 303);
  clearSessionCookie(response);

  return response;
}
