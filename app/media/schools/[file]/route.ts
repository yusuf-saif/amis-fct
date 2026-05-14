import { readFile, stat } from "node:fs/promises";
import path from "node:path";

import { notFound } from "next/navigation";

import { resolveSchoolUploadDirectory } from "@/lib/schools";

const mimeTypes: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
};

export async function GET(_: Request, context: { params: Promise<{ file: string }> }) {
  const { file } = await context.params;

  if (!/^[a-zA-Z0-9-]+\.(jpg|jpeg|png)$/.test(file)) {
    notFound();
  }

  const filePath = path.join(resolveSchoolUploadDirectory(), file);

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
