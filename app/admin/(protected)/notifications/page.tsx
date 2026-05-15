import Link from "next/link";
import { AdminRole, NotificationStatus, Prisma, SchoolLevel } from "@prisma/client";

import { AdminBanner } from "@/components/admin/admin-banner";
import { requireAdminUser } from "@/lib/auth";
import { prisma } from "@/lib/db";

export default async function AdminNotificationsPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; audienceType?: string; feedback?: string }>;
}) {
  await requireAdminUser([AdminRole.SUPER_ADMIN]);

  const params = await searchParams;
  const search = typeof params.search === "string" ? params.search.trim() : undefined;
  const audienceType = typeof params.audienceType === "string" ? params.audienceType : undefined;

  const where: Prisma.NotificationWhereInput = {
    ...(search ? { subject: { contains: search, mode: "insensitive" } } : {}),
  };

  const notifications = (await prisma.notification.findMany({
    where,
    orderBy: [{ createdAt: "desc" }],
    include: { sender: true },
  })).filter((notification) => {
    if (!audienceType) return true;
    const filters = notification.audienceFilters as { audienceType?: string } | null;
    return filters?.audienceType === audienceType;
  });

  return (
    <div className="space-y-6">
      <div className="card-admin space-y-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-[0.08em] text-brand-green-700">Notifications</p>
            <h1 className="text-3xl font-semibold text-slate-950">Notifications & Communication</h1>
            <p className="max-w-3xl text-sm text-slate-600">Draft, send, and review official communications to approved member schools with a full audit trail.</p>
          </div>
          <Link className="btn-primary" href="/admin/notifications/new">Create Notification</Link>
        </div>
        {params.feedback ? <AdminBanner title={params.feedback.replace(/-/g, " ")} tone="success" /> : null}
      </div>

      <div className="card-admin space-y-4">
        <form className="grid gap-4 md:grid-cols-[minmax(0,1fr)_220px_auto] md:items-end" method="get">
          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-900">Search by title</span>
            <input className="input-base" defaultValue={search ?? ""} name="search" placeholder="Search notifications" type="search" />
          </label>
          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-900">Audience Type</span>
            <select className="input-base" defaultValue={audienceType ?? ""} name="audienceType">
              <option value="">All audiences</option>
              <option value="ALL">All schools</option>
              <option value="AREA_COUNCIL">Area Council</option>
              <option value="SCHOOL_LEVEL">School Level</option>
              <option value="DUES_STATUS">Dues Status</option>
              <option value="INDIVIDUAL">Individual schools</option>
            </select>
          </label>
          <button className="btn-primary" type="submit">Apply</button>
        </form>

        {notifications.length === 0 ? (
          <AdminBanner description="Try changing the search term or audience filter." title="No notifications found" />
        ) : (
          <div className="space-y-4">
            {notifications.map((notification) => (
              <article className="rounded-xl border border-slate-200 bg-white p-5" key={notification.id}>
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div className="space-y-2">
                    <h2 className="text-xl font-semibold text-slate-950">{notification.subject}</h2>
                    <p className="text-sm text-slate-600">{notification.audienceDescription}</p>
                    <p className="text-sm text-slate-600">Created {notification.createdAt.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })} · {notification.status === NotificationStatus.SENT ? "Sent" : "Draft"}</p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Link className="btn-secondary" href={`/admin/notifications/${notification.id}`}>View</Link>
                    {notification.status === NotificationStatus.DRAFT ? (
                      <form action={`/api/admin/notifications/${notification.id}`} method="post">
                        <input name="intent" type="hidden" value="delete" />
                        <button className="inline-flex min-h-11 items-center justify-center rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700" type="submit">Delete</button>
                      </form>
                    ) : null}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
