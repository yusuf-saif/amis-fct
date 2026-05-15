import { readFile, stat } from "node:fs/promises";
import path from "node:path";

import { notFound } from "next/navigation";

import { buildContentStorageKey, readObjectByKey } from "@/lib/storage";

const allowedTypes = new Set(["news", "events", "resources", "notifications", "gallery", "enquiries"]);
const mimeTypes: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".pdf": "application/pdf",
  ".doc": "application/msword",
  ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
};

export async function GET(_: Request, context: { params: Promise<{ type: string; file: string }> }) {
  const { type, file } = await context.params;

  if (!allowedTypes.has(type) || !/^[a-zA-Z0-9-]+\.(jpg|jpeg|png|pdf|doc|docx)$/.test(file)) {
    notFound();
  }

  const object = await readObjectByKey(buildContentStorageKey(type as "news" | "events" | "resources" | "notifications" | "gallery" | "enquiries", file));
  if (object) {
    return new Response(object.body, {
      headers: {
        "Content-Type": object.contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  }

  const filePath = path.join(process.cwd(), "uploads", type, file);

  try {
    await stat(filePath);
  } catch {
    notFound();
  }

  const extension = path.extname(file).toLowerCase();
  const buffer = await readFile(filePath);

  return new Response(buffer, {
    headers: {
      "Content-Type": mimeTypes[extension] ?? "application/octet-stream",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
