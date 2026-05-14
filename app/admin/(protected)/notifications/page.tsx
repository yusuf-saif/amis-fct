import { AdminRole } from "@prisma/client";

import { SectionPlaceholder } from "@/components/admin/section-placeholder";
import { requireAdminUser } from "@/lib/auth";

export default async function AdminNotificationsPage() {
  await requireAdminUser([AdminRole.SUPER_ADMIN]);

  return <SectionPlaceholder description="Notification records and an email provider placeholder are ready. Composer and delivery reporting come later." title="Notifications" />;
}
