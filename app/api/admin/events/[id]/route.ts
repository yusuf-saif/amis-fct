import { NextResponse } from "next/server";
import { PublishingStatus } from "@prisma/client";

import { writeAuditLog } from "@/lib/audit-log";
import { getCurrentAdminUser } from "@/lib/auth";
import { generateUniqueEventSlug } from "@/lib/content";
import { prisma } from "@/lib/db";
import { deleteContentFileIfUnreferenced, saveContentFile, validateContentFile } from "@/lib/uploads";
import { eventFormSchema } from "@/lib/validation/content";

function optionalString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" && value.trim().length > 0 ? value : undefined;
}

function detailUrl(request: Request, id: string, feedback: string) {
  return new URL(`/admin/events/${id}?feedback=${feedback}`, request.url);
}

export async function POST(request: Request, context: { params: Promise<{ id: string }> }) {
  const adminUser = await getCurrentAdminUser();
  if (!adminUser) return NextResponse.redirect(new URL("/admin/login?error=session_expired", request.url), 303);

  const { id } = await context.params;
  const event = await prisma.event.findUnique({ where: { id } });
  if (!event) return NextResponse.redirect(new URL("/admin/events?feedback=missing-event", request.url), 303);

  const formData = await request.formData();
  const intent = String(formData.get("intent") ?? "update");

  if (intent === "delete") {
    const oldAttachmentUrl = event.attachmentUrl;
    await prisma.event.delete({ where: { id } });
    await deleteContentFileIfUnreferenced(oldAttachmentUrl);
    await writeAuditLog({ actorAdminUserId: adminUser.id, action: "EVENT_DELETE", entityType: "Event", entityId: id });
    return NextResponse.redirect(new URL("/admin/events?feedback=deleted", request.url), 303);
  }

  if (intent === "mark_completed" || intent === "mark_upcoming") {
    const status = intent === "mark_completed" ? PublishingStatus.ARCHIVED : PublishingStatus.PUBLISHED;
    await prisma.event.update({ where: { id }, data: { status, publishedAt: status === PublishingStatus.PUBLISHED ? event.publishedAt ?? new Date() : event.publishedAt } });
    await writeAuditLog({ actorAdminUserId: adminUser.id, action: status === PublishingStatus.ARCHIVED ? "EVENT_MARK_COMPLETED" : "EVENT_MARK_UPCOMING", entityType: "Event", entityId: id });
    return NextResponse.redirect(new URL("/admin/events?feedback=status-updated", request.url), 303);
  }

  const parsed = eventFormSchema.safeParse({
    title: formData.get("title"),
    summary: formData.get("summary"),
    description: formData.get("description"),
    location: formData.get("location"),
    mapUrl: optionalString(formData, "mapUrl"),
    eventType: formData.get("eventType"),
    startAt: new Date(String(formData.get("startAt"))).toISOString(),
    endAt: optionalString(formData, "endAt") ? new Date(optionalString(formData, "endAt") as string).toISOString() : undefined,
    registrationContact: optionalString(formData, "registrationContact"),
    status: formData.get("status"),
  });

  const attachment = formData.get("attachment");
  const attachmentFile = attachment instanceof File ? attachment : null;
  const attachmentError = validateContentFile(attachmentFile, false, { maxSizeMb: 10 });
  if (!parsed.success || attachmentError) return NextResponse.redirect(detailUrl(request, id, "invalid-event-form"), 303);

  const slug = await generateUniqueEventSlug(parsed.data.title, id);
  const upload = attachmentFile && attachmentFile.size > 0 ? await saveContentFile(attachmentFile, "events") : null;

  await prisma.event.update({
    where: { id },
    data: {
      title: parsed.data.title,
      slug,
      summary: parsed.data.summary,
      description: parsed.data.description,
      location: parsed.data.location,
      mapUrl: parsed.data.mapUrl || null,
      eventType: parsed.data.eventType,
      startAt: new Date(parsed.data.startAt),
      endAt: parsed.data.endAt ? new Date(parsed.data.endAt) : null,
      registrationContact: parsed.data.registrationContact || null,
      status: parsed.data.status,
      publishedAt: parsed.data.status === PublishingStatus.PUBLISHED ? event.publishedAt ?? new Date(parsed.data.startAt) : event.publishedAt,
      attachmentUrl: upload?.url ?? event.attachmentUrl,
      attachmentFileName: upload?.fileName ?? event.attachmentFileName,
      attachmentFileType: upload?.fileType ?? event.attachmentFileType,
      attachmentFileSizeBytes: upload?.fileSizeBytes ?? event.attachmentFileSizeBytes,
    },
  });

  if (upload?.url && event.attachmentUrl && event.attachmentUrl !== upload.url) {
    await deleteContentFileIfUnreferenced(event.attachmentUrl);
  }

  await writeAuditLog({ actorAdminUserId: adminUser.id, action: "EVENT_UPDATE", entityType: "Event", entityId: id, metadata: { slug } });
  return NextResponse.redirect(detailUrl(request, id, "updated"), 303);
}
