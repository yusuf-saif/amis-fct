import { NextResponse } from "next/server";
import { PublishingStatus } from "@prisma/client";

import { writeAuditLog } from "@/lib/audit-log";
import { getCurrentAdminUser } from "@/lib/auth";
import { buildExcerpt, generateUniqueNewsSlug } from "@/lib/content";
import { prisma } from "@/lib/db";
import { deleteContentFileIfUnreferenced, saveContentFile, validateContentFile } from "@/lib/uploads";
import { newsFormSchema } from "@/lib/validation/content";

function optionalString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" && value.trim().length > 0 ? value : undefined;
}

function detailUrl(request: Request, id: string, feedback: string) {
  return new URL(`/admin/news/${id}?feedback=${feedback}`, request.url);
}

export async function POST(request: Request, context: { params: Promise<{ id: string }> }) {
  const adminUser = await getCurrentAdminUser();
  if (!adminUser) {
    return NextResponse.redirect(new URL("/admin/login?error=session_expired", request.url), 303);
  }

  const { id } = await context.params;
  const post = await prisma.newsPost.findUnique({ where: { id } });
  if (!post) {
    return NextResponse.redirect(new URL("/admin/news?feedback=missing-news", request.url), 303);
  }

  const formData = await request.formData();
  const intent = String(formData.get("intent") ?? "update");

  if (intent === "delete") {
    const oldFeaturedImageUrl = post.featuredImageUrl;
    const oldAttachmentUrl = post.attachmentUrl;
    await prisma.newsPost.delete({ where: { id } });
    await Promise.all([deleteContentFileIfUnreferenced(oldFeaturedImageUrl), deleteContentFileIfUnreferenced(oldAttachmentUrl)]);
    await writeAuditLog({ actorAdminUserId: adminUser.id, action: "NEWS_DELETE", entityType: "NewsPost", entityId: id });
    return NextResponse.redirect(new URL("/admin/news?feedback=deleted", request.url), 303);
  }

  if (intent === "publish" || intent === "draft") {
    const status = intent === "publish" ? PublishingStatus.PUBLISHED : PublishingStatus.DRAFT;
    await prisma.newsPost.update({ where: { id }, data: { status, publishedAt: status === PublishingStatus.PUBLISHED ? new Date() : null } });
    await writeAuditLog({ actorAdminUserId: adminUser.id, action: status === PublishingStatus.PUBLISHED ? "NEWS_PUBLISH" : "NEWS_DRAFT", entityType: "NewsPost", entityId: id });
    return NextResponse.redirect(new URL("/admin/news?feedback=status-updated", request.url), 303);
  }

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
    return NextResponse.redirect(detailUrl(request, id, "invalid-news-form"), 303);
  }

  const slug = await generateUniqueNewsSlug(parsed.data.title, id);
  const featuredImageUpload = imageFile && imageFile.size > 0 ? await saveContentFile(imageFile, "news") : null;
  const attachmentUpload = attachmentFile && attachmentFile.size > 0 ? await saveContentFile(attachmentFile, "news") : null;
  const publishedAt = parsed.data.status === PublishingStatus.PUBLISHED ? parsed.data.publishedAt ? new Date(parsed.data.publishedAt) : post.publishedAt ?? new Date() : null;

  await prisma.newsPost.update({
    where: { id },
    data: {
      title: parsed.data.title,
      slug,
      excerpt: buildExcerpt(parsed.data.body),
      body: parsed.data.body,
      category: parsed.data.category,
      status: parsed.data.status,
      publishedAt,
      featuredImageUrl: featuredImageUpload?.url ?? post.featuredImageUrl,
      attachmentUrl: attachmentUpload?.url ?? post.attachmentUrl,
      metaTitle: parsed.data.metaTitle || null,
      metaDescription: parsed.data.metaDescription || null,
    },
  });

  if (featuredImageUpload?.url && post.featuredImageUrl && post.featuredImageUrl !== featuredImageUpload.url) {
    await deleteContentFileIfUnreferenced(post.featuredImageUrl);
  }

  if (attachmentUpload?.url && post.attachmentUrl && post.attachmentUrl !== attachmentUpload.url) {
    await deleteContentFileIfUnreferenced(post.attachmentUrl);
  }

  await writeAuditLog({ actorAdminUserId: adminUser.id, action: "NEWS_UPDATE", entityType: "NewsPost", entityId: id, metadata: { slug } });
  return NextResponse.redirect(detailUrl(request, id, "updated"), 303);
}
