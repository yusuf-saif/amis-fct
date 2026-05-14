import { NextResponse } from "next/server";
import { PublishingStatus } from "@prisma/client";

import { writeAuditLog } from "@/lib/audit-log";
import { getCurrentAdminUser } from "@/lib/auth";
import { buildExcerpt, generateUniqueNewsSlug } from "@/lib/content";
import { prisma } from "@/lib/db";
import { saveContentFile, validateContentFile } from "@/lib/uploads";
import { newsFormSchema } from "@/lib/validation/content";

function optionalString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" && value.trim().length > 0 ? value : undefined;
}

export async function POST(request: Request) {
  const adminUser = await getCurrentAdminUser();
  if (!adminUser) {
    return NextResponse.redirect(new URL("/admin/login?error=session_expired", request.url), 303);
  }

  const formData = await request.formData();
  const parsed = newsFormSchema.safeParse({
    title: formData.get("title"),
    body: formData.get("body"),
    category: formData.get("category"),
    status: formData.get("status"),
    publishedAt: optionalString(formData, "publishedAt") ? new Date(optionalString(formData, "publishedAt") as string).toISOString() : undefined,
    metaTitle: optionalString(formData, "metaTitle"),
    metaDescription: optionalString(formData, "metaDescription"),
  });

  const featuredImage = formData.get("featuredImage");
  const attachment = formData.get("attachment");
  const imageFile = featuredImage instanceof File ? featuredImage : null;
  const attachmentFile = attachment instanceof File ? attachment : null;

  const imageError = validateContentFile(imageFile, false, { imagesOnly: true, maxSizeMb: 5 });
  const attachmentError = validateContentFile(attachmentFile, false, { maxSizeMb: 10 });

  if (!parsed.success || imageError || attachmentError) {
    return NextResponse.redirect(new URL("/admin/news?feedback=invalid-news-form", request.url), 303);
  }

  const slug = await generateUniqueNewsSlug(parsed.data.title);
  const featuredImageUpload = imageFile && imageFile.size > 0 ? await saveContentFile(imageFile, "news") : null;
  const attachmentUpload = attachmentFile && attachmentFile.size > 0 ? await saveContentFile(attachmentFile, "news") : null;
  const publishedAt = parsed.data.status === PublishingStatus.PUBLISHED ? parsed.data.publishedAt ? new Date(parsed.data.publishedAt) : new Date() : null;

  const post = await prisma.newsPost.create({
    data: {
      title: parsed.data.title,
      slug,
      excerpt: buildExcerpt(parsed.data.body),
      body: parsed.data.body,
      category: parsed.data.category,
      featuredImageUrl: featuredImageUpload?.url ?? null,
      attachmentUrl: attachmentUpload?.url ?? null,
      status: parsed.data.status,
      publishedAt,
      metaTitle: parsed.data.metaTitle || null,
      metaDescription: parsed.data.metaDescription || null,
      authorId: adminUser.id,
    },
  });

  await writeAuditLog({ actorAdminUserId: adminUser.id, action: "NEWS_CREATE", entityType: "NewsPost", entityId: post.id, metadata: { slug } });

  return NextResponse.redirect(new URL(`/admin/news/${post.id}?feedback=created`, request.url), 303);
}
