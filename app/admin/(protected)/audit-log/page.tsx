import { AdminRole, Prisma } from "@prisma/client";

import { AdminBanner } from "@/components/admin/admin-banner";
import { requireAdminUser } from "@/lib/auth";
import { prisma } from "@/lib/db";

export default async function AdminAuditLogPage({ searchParams }: { searchParams: Promise<{ action?: string; entityType?: string; adminUserId?: string; from?: string; to?: string; page?: string }> }) {
  await requireAdminUser([AdminRole.SUPER_ADMIN]);
  const params = await searchParams;
  const page = Math.max(1, Number(params.page ?? 1));
  const take = 20;
  const skip = (page - 1) * take;

  const where: Prisma.AuditLogWhereInput = {
    ...(params.action ? { action: params.action } : {}),
    ...(params.entityType ? { entityType: params.entityType } : {}),
    ...(params.adminUserId ? { actorAdminUserId: params.adminUserId } : {}),
    ...(params.from || params.to ? { createdAt: { ...(params.from ? { gte: new Date(params.from) } : {}), ...(params.to ? { lte: new Date(params.to) } : {}) } } : {}),
  };

  const [rows, total, users] = await Promise.all([
    prisma.auditLog.findMany({ where, include: { actor: true }, orderBy: { createdAt: "desc" }, skip, take }),
    prisma.auditLog.count({ where }),
    prisma.adminUser.findMany({ select: { id: true, email: true }, orderBy: { email: "asc" } }),
  ]);

  const totalPages = Math.max(1, Math.ceil(total / take));

  return (
    <div className="space-y-6">
      <div className="card-admin space-y-4">
        <div className="space-y-2"><p className="text-sm font-semibold uppercase tracking-[0.08em] text-brand-green-700">Audit Log</p><h1 className="text-3xl font-semibold text-slate-950">Audit history</h1></div>
      </div>

      <div className="card-admin space-y-4">
        <form className="grid gap-4 md:grid-cols-[180px_180px_220px_180px_180px_auto] md:items-end" method="get">
          <label className="block space-y-2"><span className="text-sm font-medium text-slate-900">Action</span><input className="input-base" defaultValue={params.action ?? ""} name="action" /></label>
          <label className="block space-y-2"><span className="text-sm font-medium text-slate-900">Entity Type</span><input className="input-base" defaultValue={params.entityType ?? ""} name="entityType" /></label>
          <label className="block space-y-2"><span className="text-sm font-medium text-slate-900">Admin User</span><select className="input-base" defaultValue={params.adminUserId ?? ""} name="adminUserId"><option value="">All users</option>{users.map((user) => <option key={user.id} value={user.id}>{user.email}</option>)}</select></label>
          <label className="block space-y-2"><span className="text-sm font-medium text-slate-900">From</span><input className="input-base" defaultValue={params.from ?? ""} name="from" type="date" /></label>
          <label className="block space-y-2"><span className="text-sm font-medium text-slate-900">To</span><input className="input-base" defaultValue={params.to ?? ""} name="to" type="date" /></label>
          <button className="btn-primary" type="submit">Apply</button>
        </form>

        {rows.length === 0 ? <AdminBanner title="No audit rows match the selected filters" /> : (
          <div className="space-y-4">
            {rows.map((row) => (
              <article className="rounded-xl border border-slate-200 bg-white p-4 text-sm" key={row.id}>
                <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
                  <div className="space-y-1">
                    <p className="font-semibold text-slate-950">{row.action}</p>
                    <p className="text-slate-600">{row.entityType}{row.entityId ? ` · ${row.entityId}` : ""}</p>
                    <p className="text-slate-600">{row.actor?.email ?? "System"}</p>
                  </div>
                  <p className="text-slate-500">{row.createdAt.toLocaleString("en-GB")}</p>
                </div>
              </article>
            ))}

            {totalPages > 1 ? (
              <div className="flex items-center justify-between pt-2 text-sm text-slate-600">
                <span>Page {page} of {totalPages}</span>
                <div className="flex gap-3">
                  {page > 1 ? <a className="btn-secondary" href={`?page=${page - 1}`}>Previous</a> : null}
                  {page < totalPages ? <a className="btn-secondary" href={`?page=${page + 1}`}>Next</a> : null}
                </div>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}
