import { AdminRole } from "@prisma/client";
import { NextResponse } from "next/server";

import { writeAuditLog } from "@/lib/audit-log";
import { requireAdminUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { generateUniqueGallerySlug } from "@/lib/gallery";
import { saveContentFile, validateContentFile } from "@/lib/uploads";
import { galleryAlbumSchema } from "@/lib/validation/gallery";

export async function POST(request: Request) {
  const adminUser = await requireAdminUser([AdminRole.SUPER_ADMIN, AdminRole.EDITOR]);
  const formData = await request.formData();
  const parsed = galleryAlbumSchema.safeParse({
    title: formData.get("title"),
    summary: formData.get("summary"),
    eventDate: new Date(String(formData.get("eventDate"))).toISOString(),
    eventId: formData.get("eventId"),
    status: formData.get("status"),
  });
  const cover = formData.get("coverPhoto");
  const coverFile = cover instanceof File ? cover : null;
  const coverError = validateContentFile(coverFile, true, { imagesOnly: true, maxSizeMb: 5 });
  const photoEntries = formData.getAll("photos");
  const photoFiles = photoEntries.filter((entry): entry is File => entry instanceof File && entry.size > 0);
  const photosValid = photoFiles.every((file) => !validateContentFile(file, true, { imagesOnly: true, maxSizeMb: 5 }));

  if (!parsed.success || coverError || photoFiles.length === 0 || !photosValid || !coverFile) {
    return NextResponse.redirect(new URL("/admin/gallery?feedback=invalid-gallery-form", request.url), 303);
  }

  const slug = await generateUniqueGallerySlug(parsed.data.title);
  const coverUpload = await saveContentFile(coverFile, "gallery");
  const photoUploads = await Promise.all(photoFiles.map((file) => saveContentFile(file, "gallery")));
  const album = await prisma.galleryAlbum.create({
    data: {
      title: parsed.data.title,
      slug,
      summary: parsed.data.summary || null,
      coverImageUrl: coverUpload.url,
      photoUrls: photoUploads.map((photo) => photo.url),
      eventDate: new Date(parsed.data.eventDate),
      eventId: parsed.data.eventId || null,
      status: parsed.data.status,
    },
  });

  await writeAuditLog({ actorAdminUserId: adminUser.id, action: "GALLERY_CREATE", entityType: "GalleryAlbum", entityId: album.id, metadata: { slug } });
  return NextResponse.redirect(new URL(`/admin/gallery/${album.id}?feedback=created`, request.url), 303);
}
