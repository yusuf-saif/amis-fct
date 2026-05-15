import { randomUUID } from "node:crypto";
import { access, mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";

import { prisma } from "@/lib/db";
import { resolveSchoolUploadDirectory } from "@/lib/schools";
import {
  buildContentStorageKey,
  buildSchoolStorageKey,
  deleteObjectByKey,
  isObjectStorageEnabled,
  resolveObjectKeyFromUrl,
  uploadObject,
} from "@/lib/storage";

const allowedMimeTypes = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
} as const;

const contentMimeTypes = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "application/pdf": ".pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": ".docx",
  "application/msword": ".doc",
} as const;

type ContentType = "news" | "events" | "resources" | "notifications" | "gallery" | "enquiries";

export function validateSchoolPhotoFile(file: File | null, required: boolean) {
  if (!file || file.size === 0) {
    if (required) {
      return "School photo is required.";
    }

    return null;
  }

  if (!(file.type in allowedMimeTypes)) {
    return "School photo must be a JPG or PNG image.";
  }

  if (file.size > 5 * 1024 * 1024) {
    return "School photo must be 5MB or smaller.";
  }

  return null;
}

export async function saveSchoolPhoto(file: File) {
  const extension = allowedMimeTypes[file.type as keyof typeof allowedMimeTypes];
  const filename = `${randomUUID()}${extension}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  if (isObjectStorageEnabled()) {
    return uploadObject(buildSchoolStorageKey(filename), buffer, file.type);
  }

  const directory = resolveSchoolUploadDirectory();
  await mkdir(directory, { recursive: true });

  const outputPath = path.join(directory, filename);
  await writeFile(outputPath, buffer);

  return `/media/schools/${filename}`;
}

export function validateContentFile(file: File | null, required: boolean, options?: { imagesOnly?: boolean; maxSizeMb?: number }) {
  const maxSizeMb = options?.maxSizeMb ?? 10;
  const accepted = options?.imagesOnly ? allowedMimeTypes : contentMimeTypes;

  if (!file || file.size === 0) {
    if (required) {
      return "A file is required.";
    }

    return null;
  }

  if (!(file.type in accepted)) {
    return options?.imagesOnly ? "File must be a JPG or PNG image." : "File must be a PDF, DOC, DOCX, JPG, or PNG file.";
  }

  if (file.size > maxSizeMb * 1024 * 1024) {
    return `File must be ${maxSizeMb}MB or smaller.`;
  }

  return null;
}

function resolveContentUploadDirectory(type: ContentType) {
  return path.join(process.cwd(), "uploads", type);
}

export async function saveContentFile(file: File, type: ContentType) {
  const extension = contentMimeTypes[file.type as keyof typeof contentMimeTypes];
  const filename = `${randomUUID()}${extension}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  if (isObjectStorageEnabled()) {
    const url = await uploadObject(buildContentStorageKey(type, filename), buffer, file.type);

    return {
      url,
      fileName: filename,
      fileType: file.type,
      fileSizeBytes: file.size,
    };
  }

  const directory = resolveContentUploadDirectory(type);
  await mkdir(directory, { recursive: true });

  const outputPath = path.join(directory, filename);
  await writeFile(outputPath, buffer);

  return {
    url: `/media/content/${type}/${filename}`,
    fileName: filename,
    fileType: file.type,
    fileSizeBytes: file.size,
  };
}

function resolveContentFilePathFromUrl(url: string) {
  const match = url.match(/^\/media\/content\/(news|events|resources|notifications|gallery|enquiries)\/([a-zA-Z0-9-]+\.[a-z0-9]+)$/);
  if (!match) {
    return null;
  }

  const [, type, fileName] = match;
  return path.join(process.cwd(), "uploads", type, fileName);
}

function resolveSchoolFilePathFromUrl(url: string) {
  const match = url.match(/^\/media\/schools\/([a-zA-Z0-9-]+\.[a-z0-9]+)$/);
  if (!match) {
    return null;
  }

  return path.join(resolveSchoolUploadDirectory(), match[1]);
}

async function deleteLocalFileIfPresent(filePath: string | null) {
  if (!filePath) {
    return;
  }

  try {
    await access(filePath);
    await rm(filePath);
  } catch {
    // Best-effort cleanup only.
  }
}

async function deleteFileByUrl(url: string, mode: "content" | "schools") {
  const objectKey = resolveObjectKeyFromUrl(url);
  if (objectKey) {
    await deleteObjectByKey(objectKey);
    return;
  }

  await deleteLocalFileIfPresent(mode === "content" ? resolveContentFilePathFromUrl(url) : resolveSchoolFilePathFromUrl(url));
}

export async function deleteSchoolPhotoIfUnreferenced(url: string | null | undefined) {
  if (!url) {
    return;
  }

  const schoolCount = await prisma.school.count({ where: { photoUrl: url } });
  if (schoolCount > 0) {
    return;
  }

  await deleteFileByUrl(url, "schools");
}

export async function deleteContentFileIfUnreferenced(url: string | null | undefined) {
  if (!url) {
    return;
  }

  const [newsFeaturedCount, newsAttachmentCount, eventAttachmentCount, resourceFileCount, notificationAttachmentCount, enquiryAttachmentCount, galleryCoverCount, galleryAlbums] = await Promise.all([
    prisma.newsPost.count({ where: { featuredImageUrl: url } }),
    prisma.newsPost.count({ where: { attachmentUrl: url } }),
    prisma.event.count({ where: { attachmentUrl: url } }),
    prisma.resourceFile.count({ where: { fileUrl: url } }),
    prisma.notification.count({ where: { attachmentUrl: url } }),
    prisma.contactEnquiry.count({ where: { attachmentUrl: url } }),
    prisma.galleryAlbum.count({ where: { coverImageUrl: url } }),
    prisma.galleryAlbum.findMany({ select: { photoUrls: true } }),
  ]);

  const galleryPhotoCount = galleryAlbums.reduce((count, album) => {
    const photoUrls = Array.isArray(album.photoUrls) ? (album.photoUrls as string[]) : [];
    return count + (photoUrls.includes(url) ? 1 : 0);
  }, 0);

  if (newsFeaturedCount + newsAttachmentCount + eventAttachmentCount + resourceFileCount + notificationAttachmentCount + enquiryAttachmentCount + galleryCoverCount + galleryPhotoCount > 0) {
    return;
  }

  await deleteFileByUrl(url, "content");
}
