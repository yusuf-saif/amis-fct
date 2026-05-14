import { NextResponse } from "next/server";
import { PublishingStatus } from "@prisma/client";

import { writeAuditLog } from "@/lib/audit-log";
import { generateUniqueEventSlug } from "@/lib/content";
import { getCurrentAdminUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { saveContentFile, validateContentFile } from "@/lib/uploads";
import { eventFormSchema } from "@/lib/validation/content";

function optionalString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" && value.trim().length > 0 ? value : undefined;
}

export async function POST(request: Request) {
  const adminUser = await getCurrentAdminUser();
  if (!adminUser) return NextResponse.redirect(new URL("/admin/login?error=session_expired", request.url), 303);

  const formData = await request.formData();
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
  if (!parsed.success || attachmentError) return NextResponse.redirect(new URL("/admin/events?feedback=invalid-event-form", request.url), 303);

  const slug = await generateUniqueEventSlug(parsed.data.title);
  const upload = attachmentFile && attachmentFile.size > 0 ? await saveContentFile(attachmentFile, "events") : null;
  const publishedAt = parsed.data.status === PublishingStatus.PUBLISHED ? new Date(parsed.data.startAt) : null;

  const event = await prisma.event.create({
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
      publishedAt,
      attachmentUrl: upload?.url ?? null,
      attachmentFileName: upload?.fileName ?? null,
      attachmentFileType: upload?.fileType ?? null,
      attachmentFileSizeBytes: upload?.fileSizeBytes ?? null,
    },
  });

  await writeAuditLog({ actorAdminUserId: adminUser.id, action: "EVENT_CREATE", entityType: "Event", entityId: event.id, metadata: { slug } });
  return NextResponse.redirect(new URL(`/admin/events/${event.id}?feedback=created`, request.url), 303);
}
