import { AdminRole } from "@prisma/client";
import { NextResponse } from "next/server";

import { writeAuditLog } from "@/lib/audit-log";
import { requireAdminUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { generateUniqueGallerySlug } from "@/lib/gallery";
import { deleteContentFileIfUnreferenced, saveContentFile, validateContentFile } from "@/lib/uploads";
import { galleryAlbumSchema } from "@/lib/validation/gallery";

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  return NextResponse.redirect(new URL(`/admin/gallery/${id}`, request.url), 303);
}

function detailUrl(request: Request, id: string, feedback: string) {
  return new URL(`/admin/gallery/${id}?feedback=${feedback}`, request.url);
}

export async function POST(request: Request, context: { params: Promise<{ id: string }> }) {
  const adminUser = await requireAdminUser([AdminRole.SUPER_ADMIN, AdminRole.EDITOR]);
  const { id } = await context.params;
  const album = await prisma.galleryAlbum.findUnique({ where: { id } });
  if (!album) return NextResponse.redirect(new URL("/admin/gallery?feedback=missing-gallery-album", request.url), 303);

  const formData = await request.formData();
  const intent = String(formData.get("intent") ?? "update");
  if (intent === "delete") {
    const photoUrls = Array.isArray(album.photoUrls) ? (album.photoUrls as string[]) : [];
    await prisma.galleryAlbum.delete({ where: { id } });
    await Promise.all([deleteContentFileIfUnreferenced(album.coverImageUrl), ...photoUrls.map((url) => deleteContentFileIfUnreferenced(url))]);
    await writeAuditLog({ actorAdminUserId: adminUser.id, action: "GALLERY_DELETE", entityType: "GalleryAlbum", entityId: id });
    return NextResponse.redirect(new URL("/admin/gallery?feedback=deleted", request.url), 303);
  }

  const parsed = galleryAlbumSchema.safeParse({
    title: formData.get("title"),
    summary: formData.get("summary"),
    eventDate: new Date(String(formData.get("eventDate"))).toISOString(),
    eventId: formData.get("eventId"),
    status: formData.get("status"),
  });
  const cover = formData.get("coverPhoto");
  const coverFile = cover instanceof File ? cover : null;
  const coverError = validateContentFile(coverFile, false, { imagesOnly: true, maxSizeMb: 5 });
  const photoEntries = formData.getAll("photos");
  const photoFiles = photoEntries.filter((entry): entry is File => entry instanceof File && entry.size > 0);
  const photosValid = photoFiles.every((file) => !validateContentFile(file, true, { imagesOnly: true, maxSizeMb: 5 }));
  if (!parsed.success || coverError || !photosValid) return NextResponse.redirect(detailUrl(request, id, "invalid-gallery-form"), 303);

  const slug = await generateUniqueGallerySlug(parsed.data.title, id);
  const coverUpload = coverFile && coverFile.size > 0 ? await saveContentFile(coverFile, "gallery") : null;
  const photoUploads = photoFiles.length > 0 ? await Promise.all(photoFiles.map((file) => saveContentFile(file, "gallery"))) : null;
  const oldPhotoUrls = Array.isArray(album.photoUrls) ? (album.photoUrls as string[]) : [];
  const nextPhotoUrls = photoUploads ? photoUploads.map((photo) => photo.url) : oldPhotoUrls;

  await prisma.galleryAlbum.update({
    where: { id },
    data: {
      title: parsed.data.title,
      slug,
      summary: parsed.data.summary || null,
      coverImageUrl: coverUpload?.url ?? album.coverImageUrl,
      photoUrls: nextPhotoUrls,
      eventDate: new Date(parsed.data.eventDate),
      eventId: parsed.data.eventId || null,
      status: parsed.data.status,
    },
  });

  if (coverUpload?.url && album.coverImageUrl !== coverUpload.url) await deleteContentFileIfUnreferenced(album.coverImageUrl);
  if (photoUploads) await Promise.all(oldPhotoUrls.map((url) => deleteContentFileIfUnreferenced(url)));

  await writeAuditLog({ actorAdminUserId: adminUser.id, action: "GALLERY_UPDATE", entityType: "GalleryAlbum", entityId: id, metadata: { slug } });
  return NextResponse.redirect(detailUrl(request, id, "updated"), 303);
}
