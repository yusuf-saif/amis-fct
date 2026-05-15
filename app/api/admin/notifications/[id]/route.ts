import { NextResponse } from "next/server";
import { NotificationStatus } from "@prisma/client";

import { writeAuditLog } from "@/lib/audit-log";
import { getCurrentAdminUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { buildAudienceDescription, isDraftNotification, resolveNotificationRecipients, type NotificationAudienceFilters } from "@/lib/notifications";
import { deleteContentFileIfUnreferenced, saveContentFile, validateContentFile } from "@/lib/uploads";
import { notificationAudienceSchema, notificationFormSchema } from "@/lib/validation/notifications";

function formArray(formData: FormData, key: string) {
  return formData.getAll(key).filter((value): value is string => typeof value === "string" && value.length > 0);
}

function detailUrl(request: Request, id: string, feedback: string) {
  return new URL(`/admin/notifications/${id}?feedback=${feedback}`, request.url);
}

export async function GET(_: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const notification = await prisma.notification.findUnique({ where: { id } });
  if (!notification) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(notification);
}

export async function POST(request: Request, context: { params: Promise<{ id: string }> }) {
  const adminUser = await getCurrentAdminUser();
  if (!adminUser || adminUser.role !== "SUPER_ADMIN") {
    return NextResponse.redirect(new URL("/admin/login?error=session_expired", request.url), 303);
  }

  const { id } = await context.params;
  const notification = await prisma.notification.findUnique({ where: { id } });
  if (!notification) {
    return NextResponse.redirect(new URL("/admin/notifications?feedback=missing-notification", request.url), 303);
  }

  if (!isDraftNotification(notification)) {
    return NextResponse.redirect(detailUrl(request, id, "sent-notifications-are-read-only"), 303);
  }

  const formData = await request.formData();
  const intent = String(formData.get("intent") ?? "update");

  if (intent === "delete") {
    const oldAttachmentUrl = notification.attachmentUrl;
    await prisma.notification.delete({ where: { id } });
    await deleteContentFileIfUnreferenced(oldAttachmentUrl);
    await writeAuditLog({ actorAdminUserId: adminUser.id, action: "NOTIFICATION_DELETE", entityType: "Notification", entityId: id });
    return NextResponse.redirect(new URL("/admin/notifications?feedback=deleted", request.url), 303);
  }

  const parsedNotification = notificationFormSchema.safeParse({
    title: formData.get("title"),
    body: formData.get("body"),
    status: NotificationStatus.DRAFT,
    scheduledFor: undefined,
  });
  const parsedAudience = notificationAudienceSchema.safeParse({
    audienceType: formData.get("audienceType"),
    areaCouncils: formArray(formData, "areaCouncils"),
    schoolLevels: formArray(formData, "schoolLevels"),
    duesStatuses: formArray(formData, "duesStatuses"),
    schoolIds: formArray(formData, "schoolIds"),
  });
  const attachment = formData.get("attachment");
  const attachmentFile = attachment instanceof File ? attachment : null;
  const attachmentError = validateContentFile(attachmentFile, false, { maxSizeMb: 5 });
  if (!parsedNotification.success || !parsedAudience.success || attachmentError) {
    return NextResponse.redirect(detailUrl(request, id, "invalid-notification-form"), 303);
  }

  const audienceFilters = parsedAudience.data as NotificationAudienceFilters;
  const recipients = await resolveNotificationRecipients(audienceFilters);
  const upload = attachmentFile && attachmentFile.size > 0 ? await saveContentFile(attachmentFile, "notifications") : null;

  await prisma.notification.update({
    where: { id },
    data: {
      subject: parsedNotification.data.title,
      body: parsedNotification.data.body,
      audienceDescription: buildAudienceDescription(audienceFilters),
      audienceFilters,
      attachmentUrl: upload?.url ?? notification.attachmentUrl,
      recipientCount: recipients.length,
    },
  });

  if (upload?.url && notification.attachmentUrl && notification.attachmentUrl !== upload.url) {
    await deleteContentFileIfUnreferenced(notification.attachmentUrl);
  }

  await writeAuditLog({ actorAdminUserId: adminUser.id, action: "NOTIFICATION_EDIT", entityType: "Notification", entityId: id, metadata: { audience: buildAudienceDescription(audienceFilters) } });
  return NextResponse.redirect(detailUrl(request, id, "updated"), 303);
}
