import { AdminRole } from "@prisma/client";

import { SectionPlaceholder } from "@/components/admin/section-placeholder";
import { requireAdminUser } from "@/lib/auth";

export default async function AdminAuditLogPage() {
  await requireAdminUser([AdminRole.SUPER_ADMIN]);

  return <SectionPlaceholder description="The audit logging helper is active. Read-only audit history screens will follow in a later phase." title="Audit Log" />;
}
