import { PublishingStatus } from "@prisma/client";
import { z } from "zod";

export const galleryAlbumSchema = z.object({
  title: z.string().trim().min(3).max(160),
  summary: z.string().trim().max(500).optional().or(z.literal("")),
  eventDate: z.string().datetime({ offset: true }),
  eventId: z.string().cuid().optional().or(z.literal("")),
  status: z.nativeEnum(PublishingStatus),
});
