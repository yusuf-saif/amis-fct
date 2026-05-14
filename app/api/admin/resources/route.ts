import { NextResponse } from "next/server";
import { PublishingStatus } from "@prisma/client";

import { writeAuditLog } from "@/lib/audit-log";
import { generateUniqueResourceSlug } from "@/lib/content";
import { getCurrentAdminUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { saveContentFile, validateContentFile } from "@/lib/uploads";
import { resourceFormSchema } from "@/lib/validation/content";

function optionalString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" && value.trim().length > 0 ? value : undefined;
}

export async function POST(request: Request) {
  const adminUser = await getCurrentAdminUser();
  if (!adminUser) return NextResponse.redirect(new URL("/admin/login?error=session_expired", request.url), 303);

  const formData = await request.formData();
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
  const fileError = validateContentFile(file, true, { maxSizeMb: 10 });
  if (!parsed.success || fileError || !file) return NextResponse.redirect(new URL("/admin/resources?feedback=invalid-resource-form", request.url), 303);

  const slug = await generateUniqueResourceSlug(parsed.data.title);
  const upload = await saveContentFile(file, "resources");
  const resource = await prisma.resourceFile.create({
    data: {
      title: parsed.data.title,
      slug,
      category: parsed.data.category,
      description: parsed.data.description || null,
      circularNumber: parsed.data.circularNumber || null,
      fileUrl: upload.url,
      fileName: upload.fileName,
      fileType: upload.fileType,
      fileSizeBytes: upload.fileSizeBytes,
      status: parsed.data.status,
      publishedAt: parsed.data.status === PublishingStatus.PUBLISHED ? parsed.data.publishedAt ? new Date(parsed.data.publishedAt) : new Date() : null,
    },
  });

  await writeAuditLog({ actorAdminUserId: adminUser.id, action: "RESOURCE_CREATE", entityType: "ResourceFile", entityId: resource.id, metadata: { slug } });
  return NextResponse.redirect(new URL(`/admin/resources/${resource.id}?feedback=created`, request.url), 303);
}
