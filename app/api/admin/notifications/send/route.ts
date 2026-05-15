import { NextResponse } from "next/server";
import { NotificationStatus } from "@prisma/client";

import { writeAuditLog } from "@/lib/audit-log";
import { getCurrentAdminUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { resolveNotificationRecipients, type NotificationAudienceFilters } from "@/lib/notifications";
import { sendTransactionalEmail } from "@/lib/email";

export async function POST(request: Request) {
  const adminUser = await getCurrentAdminUser();
  if (!adminUser || adminUser.role !== "SUPER_ADMIN") {
    return NextResponse.redirect(new URL("/admin/login?error=session_expired", request.url), 303);
  }

  const formData = await request.formData();
  const notificationId = String(formData.get("notificationId") ?? "");
  const notification = await prisma.notification.findUnique({ where: { id: notificationId } });

  if (!notification || notification.status !== NotificationStatus.DRAFT) {
    return NextResponse.redirect(new URL("/admin/notifications?feedback=invalid-send-target", request.url), 303);
  }

  const recipients = await resolveNotificationRecipients(notification.audienceFilters as NotificationAudienceFilters);
  await sendTransactionalEmail({
    to: recipients.map((recipient) => recipient.email),
    subject: notification.subject,
    html: `<p>${notification.body.replace(/\n/g, "<br />")}</p>`,
  });

  await prisma.notification.update({
    where: { id: notification.id },
    data: {
      status: NotificationStatus.SENT,
      sentAt: new Date(),
      recipientCount: recipients.length,
      deliverySummary: { provider: "placeholder", recipientCount: recipients.length },
    },
  });

  await writeAuditLog({ actorAdminUserId: adminUser.id, action: "NOTIFICATION_SEND", entityType: "Notification", entityId: notification.id, metadata: { audience: notification.audienceDescription, recipientCount: recipients.length } });
  return NextResponse.redirect(new URL(`/admin/notifications/${notification.id}?feedback=sent`, request.url), 303);
}
