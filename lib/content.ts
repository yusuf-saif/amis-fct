import { prisma } from "@/lib/db";

export const NEWS_PAGE_SIZE = 10;
export const EVENTS_PAGE_SIZE = 10;

export function slugifyContentTitle(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

export async function generateUniqueNewsSlug(title: string, excludeId?: string) {
  const base = slugifyContentTitle(title) || "news";

  for (let counter = 0; counter < 100; counter += 1) {
    const candidate = counter === 0 ? base : `${base}-${counter + 1}`;
    const existing = await prisma.newsPost.findFirst({
      where: {
        slug: candidate,
        ...(excludeId ? { NOT: { id: excludeId } } : {}),
      },
      select: { id: true },
    });

    if (!existing) {
      return candidate;
    }
  }

  return `${base}-${Date.now()}`;
}

export async function generateUniqueEventSlug(title: string, excludeId?: string) {
  const base = slugifyContentTitle(title) || "event";

  for (let counter = 0; counter < 100; counter += 1) {
    const candidate = counter === 0 ? base : `${base}-${counter + 1}`;
    const existing = await prisma.event.findFirst({
      where: {
        slug: candidate,
        ...(excludeId ? { NOT: { id: excludeId } } : {}),
      },
      select: { id: true },
    });

    if (!existing) {
      return candidate;
    }
  }

  return `${base}-${Date.now()}`;
}

export async function generateUniqueResourceSlug(title: string, excludeId?: string) {
  const base = slugifyContentTitle(title) || "resource";

  for (let counter = 0; counter < 100; counter += 1) {
    const candidate = counter === 0 ? base : `${base}-${counter + 1}`;
    const existing = await prisma.resourceFile.findFirst({
      where: {
        slug: candidate,
        ...(excludeId ? { NOT: { id: excludeId } } : {}),
      },
      select: { id: true },
    });

    if (!existing) {
      return candidate;
    }
  }

  return `${base}-${Date.now()}`;
}

export function buildExcerpt(body: string, maxLength = 120) {
  const plain = body.replace(/\s+/g, " ").trim();
  if (plain.length <= maxLength) {
    return plain;
  }

  return `${plain.slice(0, maxLength - 1).trimEnd()}…`;
}

export function getNewsStatusLabel(status: string) {
  return status === "PUBLISHED" ? "Published" : "Draft";
}

export function getEventStatusLabel(status: string) {
  switch (status) {
    case "PUBLISHED":
      return "Upcoming";
    case "ARCHIVED":
      return "Completed";
    default:
      return "Draft";
  }
}

export function getResourceStatusLabel(status: string) {
  return status === "PUBLISHED" ? "Active" : "Inactive";
}
