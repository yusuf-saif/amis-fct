import { prisma } from "@/lib/db";

export async function generateUniqueGallerySlug(title: string, excludeId?: string) {
  const base = title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80) || "gallery-album";

  for (let counter = 0; counter < 100; counter += 1) {
    const candidate = counter === 0 ? base : `${base}-${counter + 1}`;
    const existing = await prisma.galleryAlbum.findFirst({
      where: {
        slug: candidate,
        ...(excludeId ? { NOT: { id: excludeId } } : {}),
      },
      select: { id: true },
    });

    if (!existing) return candidate;
  }

  return `${base}-${Date.now()}`;
}
