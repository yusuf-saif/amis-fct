import { NextResponse } from "next/server";

import { addMinutes } from "@/lib/utils";
import { createAdminSession, setSessionCookie, verifyPassword } from "@/lib/auth";
import { writeAuditLog } from "@/lib/audit-log";
import { prisma } from "@/lib/db";
import { loginSchema } from "@/lib/validation/auth";

export async function POST(request: Request) {
  const formData = await request.formData();
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return NextResponse.redirect(new URL("/admin/login?error=invalid_credentials", request.url), 303);
  }

  const { email, password } = parsed.data;
  const adminUser = await prisma.adminUser.findUnique({ where: { email } });

  if (!adminUser || !adminUser.isActive) {
    return NextResponse.redirect(new URL("/admin/login?error=invalid_credentials", request.url), 303);
  }

  if (adminUser.lockedUntil && adminUser.lockedUntil > new Date()) {
    await writeAuditLog({
      action: "LOGIN_FAILURE",
      actorAdminUserId: adminUser.id,
      entityType: "AdminUser",
      entityId: adminUser.id,
      metadata: { reason: "locked" },
    });

    return NextResponse.redirect(new URL("/admin/login?error=invalid_credentials", request.url), 303);
  }

  const passwordIsValid = await verifyPassword(password, adminUser.passwordHash);

  if (!passwordIsValid) {
    const failedLoginAttempts = adminUser.failedLoginAttempts + 1;
    const shouldLock = failedLoginAttempts >= 5;

    await prisma.adminUser.update({
      where: { id: adminUser.id },
      data: {
        failedLoginAttempts,
        lockedUntil: shouldLock ? addMinutes(new Date(), 15) : null,
      },
    });

    await writeAuditLog({
      action: "LOGIN_FAILURE",
      actorAdminUserId: adminUser.id,
      entityType: "AdminUser",
      entityId: adminUser.id,
      metadata: { reason: shouldLock ? "locked_after_failed_attempts" : "invalid_password" },
    });

    return NextResponse.redirect(new URL("/admin/login?error=invalid_credentials", request.url), 303);
  }

  const session = await createAdminSession(adminUser.id);
  await prisma.adminUser.update({
    where: { id: adminUser.id },
    data: {
      failedLoginAttempts: 0,
      lockedUntil: null,
      lastLoginAt: new Date(),
    },
  });

  await writeAuditLog({
    action: "LOGIN_SUCCESS",
    actorAdminUserId: adminUser.id,
    entityType: "AdminSession",
    entityId: session.id,
  });

  const response = NextResponse.redirect(new URL("/admin/dashboard", request.url), 303);
  setSessionCookie(response, session.token, session.expiresAt);

  return response;
}
