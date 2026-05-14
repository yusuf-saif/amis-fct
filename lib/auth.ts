import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { NextResponse } from "next/server";

import { AdminRole } from "@prisma/client";

import { SESSION_COOKIE_NAME, SESSION_MAX_AGE_SECONDS } from "@/lib/constants";
import { prisma } from "@/lib/db";
import { generateSessionToken, hashPassword, hashSessionToken, verifyPassword } from "@/lib/security";

export { hashPassword, verifyPassword } from "@/lib/security";

export async function createAdminSession(adminUserId: string) {
  const token = generateSessionToken();
  const tokenHash = hashSessionToken(token);
  const expiresAt = new Date(Date.now() + SESSION_MAX_AGE_SECONDS * 1000);

  const session = await prisma.adminSession.create({
    data: {
      adminUserId,
      tokenHash,
      expiresAt,
    },
  });

  return { ...session, token };
}

export function setSessionCookie(response: NextResponse, token: string, expiresAt: Date) {
  response.cookies.set({
    name: SESSION_COOKIE_NAME,
    value: token,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
    expires: expiresAt,
  });
}

export function clearSessionCookie(response: NextResponse) {
  response.cookies.set({
    name: SESSION_COOKIE_NAME,
    value: "",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
}

export async function getCurrentAdminSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (!token) {
    return null;
  }

  const session = await prisma.adminSession.findFirst({
    where: {
      tokenHash: hashSessionToken(token),
      expiresAt: {
        gt: new Date(),
      },
    },
    include: {
      adminUser: true,
    },
  });

  if (!session || !session.adminUser.isActive) {
    return null;
  }

  return session;
}

export async function getCurrentAdminUser() {
  const session = await getCurrentAdminSession();
  return session?.adminUser ?? null;
}

export async function requireAdminUser(allowedRoles?: AdminRole[]) {
  const session = await getCurrentAdminSession();

  if (!session) {
    redirect("/admin/login?error=session_expired");
  }

  if (allowedRoles && !allowedRoles.includes(session.adminUser.role)) {
    redirect("/admin/forbidden");
  }

  return session.adminUser;
}
