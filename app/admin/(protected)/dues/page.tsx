import { AdminRole } from "@prisma/client";

import { SectionPlaceholder } from "@/components/admin/section-placeholder";
import { requireAdminUser } from "@/lib/auth";

export default async function AdminDuesPage() {
  await requireAdminUser([AdminRole.SUPER_ADMIN]);

  return <SectionPlaceholder description="Dues settings, summaries, filters, and CSV export are intentionally deferred until the next admin data phase." title="Dues" />;
}
