import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import { resolveSchoolUploadDirectory } from "@/lib/schools";

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
  const directory = resolveSchoolUploadDirectory();
  await mkdir(directory, { recursive: true });

  const filename = `${randomUUID()}${extension}`;
  const outputPath = path.join(directory, filename);
  const buffer = Buffer.from(await file.arrayBuffer());

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

function resolveContentUploadDirectory(type: "news" | "events" | "resources") {
  return path.join(process.cwd(), "uploads", type);
}

export async function saveContentFile(file: File, type: "news" | "events" | "resources") {
  const extension = contentMimeTypes[file.type as keyof typeof contentMimeTypes];
  const directory = resolveContentUploadDirectory(type);
  await mkdir(directory, { recursive: true });

  const filename = `${randomUUID()}${extension}`;
  const outputPath = path.join(directory, filename);
  const buffer = Buffer.from(await file.arrayBuffer());

  await writeFile(outputPath, buffer);

  return {
    url: `/media/content/${type}/${filename}`,
    fileName: filename,
    fileType: file.type,
    fileSizeBytes: file.size,
  };
}
