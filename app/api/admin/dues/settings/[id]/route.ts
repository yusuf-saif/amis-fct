import { NextResponse } from "next/server";

import { writeAuditLog } from "@/lib/audit-log";
import { getCurrentAdminUser } from "@/lib/auth";
import { setCurrentAcademicYear } from "@/lib/dues";
import { prisma } from "@/lib/db";
import { duesSettingSchema } from "@/lib/validation/dues";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  return NextResponse.redirect(new URL("/admin/dues/settings", request.url), 303);
}

export async function POST(request: Request, context: { params: Promise<{ id: string }> }) {
  const adminUser = await getCurrentAdminUser();
  if (!adminUser || adminUser.role !== "SUPER_ADMIN") {
    return NextResponse.redirect(new URL("/admin/login?error=session_expired", request.url), 303);
  }

  const { id } = await context.params;
  const formData = await request.formData();
  const intent = String(formData.get("intent") ?? "update");

  if (intent === "set_current") {
    await setCurrentAcademicYear(id, adminUser.id);
    return NextResponse.redirect(new URL("/admin/dues/settings?feedback=current-year-updated", request.url), 303);
  }

  const parsed = duesSettingSchema.safeParse({
    academicYear: formData.get("academicYear"),
    tier1Amount: formData.get("tier1Amount"),
    tier2Amount: formData.get("tier2Amount"),
    tier3Amount: formData.get("tier3Amount"),
    tier4Amount: formData.get("tier4Amount"),
  });
  if (!parsed.success) {
    return NextResponse.redirect(new URL("/admin/dues/settings?feedback=invalid-setting", request.url), 303);
  }

  const setting = await prisma.duesTierSetting.update({
    where: { id },
    data: {
      tier1Amount: parsed.data.tier1Amount,
      tier2Amount: parsed.data.tier2Amount,
      tier3Amount: parsed.data.tier3Amount,
      tier4Amount: parsed.data.tier4Amount,
    },
  });

  await writeAuditLog({ actorAdminUserId: adminUser.id, action: "DUES_SETTINGS_UPDATE", entityType: "DuesTierSetting", entityId: setting.id, metadata: { academicYear: setting.academicYear } });
  return NextResponse.redirect(new URL("/admin/dues/settings?feedback=setting-updated", request.url), 303);
}
