import { Prisma } from "@prisma/client";

import { prisma } from "@/lib/db";

type WriteAuditLogInput = {
  actorAdminUserId?: string | null;
  action: string;
  entityType: string;
  entityId?: string | null;
  metadata?: Prisma.JsonValue;
};

export async function writeAuditLog({ actorAdminUserId, action, entityType, entityId, metadata }: WriteAuditLogInput) {
  return prisma.auditLog.create({
    data: {
      actorAdminUserId: actorAdminUserId ?? null,
      action,
      entityType,
      entityId: entityId ?? null,
      metadata: metadata ?? Prisma.JsonNull,
    },
  });
}
