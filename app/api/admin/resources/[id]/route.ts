import { NextResponse } from "next/server";
import { PublishingStatus } from "@prisma/client";

import { writeAuditLog } from "@/lib/audit-log";
import { getCurrentAdminUser } from "@/lib/auth";
import { generateUniqueResourceSlug } from "@/lib/content";
import { prisma } from "@/lib/db";
import { saveContentFile, validateContentFile } from "@/lib/uploads";
import { resourceFormSchema } from "@/lib/validation/content";

function optionalString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" && value.trim().length > 0 ? value : undefined;
}

function detailUrl(request: Request, id: string, feedback: string) {
  return new URL(`/admin/resources/${id}?feedback=${feedback}`, request.url);
}

export async function POST(request: Request, context: { params: Promise<{ id: string }> }) {
  const adminUser = await getCurrentAdminUser();
  if (!adminUser) return NextResponse.redirect(new URL("/admin/login?error=session_expired", request.url), 303);

  const { id } = await context.params;
  const resource = await prisma.resourceFile.findUnique({ where: { id } });
  if (!resource) return NextResponse.redirect(new URL("/admin/resources?feedback=missing-resource", request.url), 303);

  const formData = await request.formData();
  const intent = String(formData.get("intent") ?? "update");

  if (intent === "delete") {
    await prisma.resourceFile.delete({ where: { id } });
    await writeAuditLog({ actorAdminUserId: adminUser.id, action: "RESOURCE_DELETE", entityType: "ResourceFile", entityId: id });
    return NextResponse.redirect(new URL("/admin/resources?feedback=deleted", request.url), 303);
  }

  if (intent === "activate" || intent === "deactivate") {
    const status = intent === "activate" ? PublishingStatus.PUBLISHED : PublishingStatus.DRAFT;
    await prisma.resourceFile.update({ where: { id }, data: { status, publishedAt: status === PublishingStatus.PUBLISHED ? resource.publishedAt ?? new Date() : resource.publishedAt } });
    await writeAuditLog({ actorAdminUserId: adminUser.id, action: status === PublishingStatus.PUBLISHED ? "RESOURCE_ACTIVATE" : "RESOURCE_DEACTIVATE", entityType: "ResourceFile", entityId: id });
    return NextResponse.redirect(new URL("/admin/resources?feedback=status-updated", request.url), 303);
  }

  const parsed = resourceFormSchema.safeParse({
    title: formData.get("title"),
    description: optionalString(formData, "description"),
    category: formData.get("category"),
    circularNumber: optionalString(formData, "circularNumber"),
    status: formData.get("status"),
    publishedAt: optionalString(formData, "publishedAt") ? new Date(optionalString(formData, "publishedAt") as string).toISOString() : undefined,
  });
  const fileEntry = formData.get("file");
  const file = fileEntry instanceof File ? fileEntry : null;
  const fileError = validateContentFile(file, false, { maxSizeMb: 10 });
  if (!parsed.success || fileError) return NextResponse.redirect(detailUrl(request, id, "invalid-resource-form"), 303);

  const slug = await generateUniqueResourceSlug(parsed.data.title, id);
  const upload = file && file.size > 0 ? await saveContentFile(file, "resources") : null;

  await prisma.resourceFile.update({
    where: { id },
    data: {
      title: parsed.data.title,
      slug,
      category: parsed.data.category,
      description: parsed.data.description || null,
      circularNumber: parsed.data.circularNumber || null,
      status: parsed.data.status,
      publishedAt: parsed.data.status === PublishingStatus.PUBLISHED ? parsed.data.publishedAt ? new Date(parsed.data.publishedAt) : resource.publishedAt ?? new Date() : resource.publishedAt,
      fileUrl: upload?.url ?? resource.fileUrl,
      fileName: upload?.fileName ?? resource.fileName,
      fileType: upload?.fileType ?? resource.fileType,
      fileSizeBytes: upload?.fileSizeBytes ?? resource.fileSizeBytes,
    },
  });

  await writeAuditLog({ actorAdminUserId: adminUser.id, action: "RESOURCE_UPDATE", entityType: "ResourceFile", entityId: id, metadata: { slug } });
  return NextResponse.redirect(detailUrl(request, id, "updated"), 303);
}
