import { AdminRole } from "@prisma/client";

import { SectionPlaceholder } from "@/components/admin/section-placeholder";
import { requireAdminUser } from "@/lib/auth";

export default async function AdminUsersPage() {
  await requireAdminUser([AdminRole.SUPER_ADMIN]);

  return <SectionPlaceholder description="Admin user management is reserved for a later phase after the authentication baseline is validated." title="Users" />;
}
