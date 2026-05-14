import { AdminRole } from "@prisma/client";

import { SectionPlaceholder } from "@/components/admin/section-placeholder";
import { requireAdminUser } from "@/lib/auth";

export default async function AdminSchoolsPage() {
  await requireAdminUser([AdminRole.SUPER_ADMIN]);

  return <SectionPlaceholder description="School review, approval, and editing workflows will be built in later phases on top of the schema added now." title="Schools" />;
}
