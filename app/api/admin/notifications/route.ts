import { NextResponse } from "next/server";
import { NotificationStatus } from "@prisma/client";

import { writeAuditLog } from "@/lib/audit-log";
import { getCurrentAdminUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { buildAudienceDescription, resolveNotificationRecipients, type NotificationAudienceFilters } from "@/lib/notifications";
import { saveContentFile, validateContentFile } from "@/lib/uploads";
import { notificationAudienceSchema, notificationFormSchema } from "@/lib/validation/notifications";
import { sendTransactionalEmail } from "@/lib/email";

function formArray(formData: FormData, key: string) {
  return formData.getAll(key).filter((value): value is string => typeof value === "string" && value.length > 0);
}

export async function GET(request: Request) {
  const adminUser = await getCurrentAdminUser();
  if (!adminUser || adminUser.role !== "SUPER_ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = new URL(request.url);
  const search = url.searchParams.get("search")?.trim();
  const audienceType = url.searchParams.get("audienceType") ?? undefined;

  const notifications = (await prisma.notification.findMany({
    where: search ? { subject: { contains: search, mode: "insensitive" } } : undefined,
    orderBy: { createdAt: "desc" },
  })).filter((notification) => {
    if (!audienceType) return true;
    const filters = notification.audienceFilters as { audienceType?: string } | null;
    return filters?.audienceType === audienceType;
  });

  return NextResponse.json(notifications);
}

export async function POST(request: Request) {
  const adminUser = await getCurrentAdminUser();
  if (!adminUser || adminUser.role !== "SUPER_ADMIN") {
    return NextResponse.redirect(new URL("/admin/login?error=session_expired", request.url), 303);
  }

  const formData = await request.formData();
  const status = String(formData.get("status") ?? NotificationStatus.DRAFT) as NotificationStatus;
  const parsedNotification = notificationFormSchema.safeParse({
    title: formData.get("title"),
    body: formData.get("body"),
    status,
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
    return NextResponse.redirect(new URL("/admin/notifications?feedback=invalid-notification-form", request.url), 303);
  }

  const audienceFilters = parsedAudience.data as NotificationAudienceFilters;
  const recipients = await resolveNotificationRecipients(audienceFilters);
  const upload = attachmentFile && attachmentFile.size > 0 ? await saveContentFile(attachmentFile, "notifications") : null;

  const notification = await prisma.notification.create({
    data: {
      subject: parsedNotification.data.title,
      body: parsedNotification.data.body,
      audienceDescription: buildAudienceDescription(audienceFilters),
      audienceFilters,
      attachmentUrl: upload?.url ?? null,
      status: status === NotificationStatus.SENT ? NotificationStatus.DRAFT : NotificationStatus.DRAFT,
      senderId: adminUser.id,
      recipientCount: recipients.length,
    },
  });

  await writeAuditLog({ actorAdminUserId: adminUser.id, action: "NOTIFICATION_CREATE", entityType: "Notification", entityId: notification.id, metadata: { audience: notification.audienceDescription } });

  if (status === NotificationStatus.SENT) {
    await sendTransactionalEmail({
      to: recipients.map((recipient) => recipient.email),
      subject: notification.subject,
      html: `<p>${notification.body.replace(/\n/g, "<br />")}</p>`,
    });
    await prisma.notification.update({ where: { id: notification.id }, data: { status: NotificationStatus.SENT, sentAt: new Date(), deliverySummary: { recipientCount: recipients.length, provider: "placeholder" } } });
    await writeAuditLog({ actorAdminUserId: adminUser.id, action: "NOTIFICATION_SEND", entityType: "Notification", entityId: notification.id, metadata: { audience: notification.audienceDescription, recipientCount: recipients.length } });
  }

  return NextResponse.redirect(new URL(`/admin/notifications/${notification.id}?feedback=created`, request.url), 303);
}
