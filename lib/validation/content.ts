import { EventType, NewsCategory, PublishingStatus, ResourceCategory } from "@prisma/client";
import { z } from "zod";

const emptyToUndefined = <T extends z.ZodTypeAny>(schema: T) => z.preprocess((value) => (value === "" ? undefined : value), schema);

export const newsFormSchema = z.object({
  title: z.string().trim().min(3).max(160),
  body: z.string().trim().min(20),
  category: z.nativeEnum(NewsCategory),
  status: z.nativeEnum(PublishingStatus),
  publishedAt: emptyToUndefined(z.string().datetime({ offset: true }).optional()),
  metaTitle: emptyToUndefined(z.string().trim().max(160).optional()),
  metaDescription: emptyToUndefined(z.string().trim().max(200).optional()),
});

export const eventFormSchema = z.object({
  title: z.string().trim().min(3).max(160),
  summary: z.string().trim().min(10).max(240),
  description: z.string().trim().min(20),
  location: z.string().trim().min(3).max(160),
  mapUrl: emptyToUndefined(z.string().trim().url().optional()),
  eventType: z.nativeEnum(EventType),
  startAt: z.string().datetime({ offset: true }),
  endAt: emptyToUndefined(z.string().datetime({ offset: true }).optional()),
  registrationContact: emptyToUndefined(z.string().trim().max(160).optional()),
  status: z.nativeEnum(PublishingStatus),
});

export const resourceFormSchema = z.object({
  title: z.string().trim().min(3).max(160),
  description: emptyToUndefined(z.string().trim().max(1000).optional()),
  category: z.nativeEnum(ResourceCategory),
  circularNumber: emptyToUndefined(z.string().trim().max(60).optional()),
  status: z.nativeEnum(PublishingStatus),
  publishedAt: emptyToUndefined(z.string().datetime({ offset: true }).optional()),
});

export const paginationQuerySchema = z.object({
  page: emptyToUndefined(z.coerce.number().int().min(1).optional()),
});
