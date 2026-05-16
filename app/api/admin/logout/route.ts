import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  return NextResponse.redirect(new URL("/admin/login", request.url), 303);
}

export async function POST(request: Request) {
  const [{ clearSessionCookie, getCurrentAdminSession }, { writeAuditLog }, { prisma }] = await Promise.all([
    import("@/lib/auth"),
    import("@/lib/audit-log"),
    import("@/lib/db"),
  ]);

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
