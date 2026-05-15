import { NextResponse } from "next/server";

import { writeAuditLog } from "@/lib/audit-log";
import { getCurrentAdminUser } from "@/lib/auth";
import { ACTIVE_MEMBER_BADGE_SETTING_KEY } from "@/lib/dues";
import { prisma } from "@/lib/db";
import { duesSettingSchema } from "@/lib/validation/dues";

export async function POST(request: Request) {
  const adminUser = await getCurrentAdminUser();
  if (!adminUser || adminUser.role !== "SUPER_ADMIN") {
    return NextResponse.redirect(new URL("/admin/login?error=session_expired", request.url), 303);
  }

  const formData = await request.formData();
  const intent = String(formData.get("intent") ?? "create");

  if (intent === "toggle_badge") {
    const enabled = String(formData.get("enabled")) === "true";
    await prisma.appSetting.upsert({
      where: { key: ACTIVE_MEMBER_BADGE_SETTING_KEY },
      update: { value: enabled },
      create: { key: ACTIVE_MEMBER_BADGE_SETTING_KEY, value: enabled },
    });
    await writeAuditLog({ actorAdminUserId: adminUser.id, action: "DUES_BADGE_VISIBILITY_UPDATE", entityType: "AppSetting", metadata: { enabled } });
    return NextResponse.redirect(new URL("/admin/dues/settings?feedback=badge-updated", request.url), 303);
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

  const setting = await prisma.duesTierSetting.upsert({
    where: { academicYear: parsed.data.academicYear },
    update: {
      tier1Amount: parsed.data.tier1Amount,
      tier2Amount: parsed.data.tier2Amount,
      tier3Amount: parsed.data.tier3Amount,
      tier4Amount: parsed.data.tier4Amount,
    },
    create: {
      academicYear: parsed.data.academicYear,
      tier1Amount: parsed.data.tier1Amount,
      tier2Amount: parsed.data.tier2Amount,
      tier3Amount: parsed.data.tier3Amount,
      tier4Amount: parsed.data.tier4Amount,
    },
  });

  await writeAuditLog({ actorAdminUserId: adminUser.id, action: "DUES_SETTINGS_CREATE", entityType: "DuesTierSetting", entityId: setting.id, metadata: { academicYear: setting.academicYear } });
  return NextResponse.redirect(new URL("/admin/dues/settings?feedback=setting-saved", request.url), 303);
}
