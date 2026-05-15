import { AdminRole } from "@prisma/client";

import { AdminBanner } from "@/components/admin/admin-banner";
import { requireAdminUser } from "@/lib/auth";
import { prisma } from "@/lib/db";

export default async function AdminUsersPage({ searchParams }: { searchParams: Promise<{ feedback?: string }> }) {
  await requireAdminUser([AdminRole.SUPER_ADMIN]);
  const params = await searchParams;
  const users = await prisma.adminUser.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="space-y-6">
      <div className="card-admin space-y-4">
        <div className="space-y-2"><p className="text-sm font-semibold uppercase tracking-[0.08em] text-brand-green-700">Users</p><h1 className="text-3xl font-semibold text-slate-950">Admin user management</h1></div>
        {params.feedback ? <AdminBanner title={params.feedback.replace(/-/g, " ")} tone="success" /> : null}
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
        <div className="card-admin space-y-4">
          <h2 className="text-xl font-semibold text-slate-950">Create Admin User</h2>
          <form action="/api/admin/users" className="space-y-4" method="post">
            <input name="intent" type="hidden" value="create" />
            <label className="block space-y-2"><span className="text-sm font-medium text-slate-900">Name</span><input className="input-base" name="name" required /></label>
            <label className="block space-y-2"><span className="text-sm font-medium text-slate-900">Email</span><input className="input-base" name="email" required type="email" /></label>
            <label className="block space-y-2"><span className="text-sm font-medium text-slate-900">Role</span><select className="input-base" defaultValue={AdminRole.EDITOR} name="role"><option value={AdminRole.SUPER_ADMIN}>Super Admin</option><option value={AdminRole.EDITOR}>Editor</option></select></label>
            <label className="block space-y-2"><span className="text-sm font-medium text-slate-900">Temporary Password</span><input className="input-base" minLength={8} name="password" required type="password" /></label>
            <button className="btn-primary" type="submit">Create User</button>
          </form>
        </div>

        <div className="card-admin space-y-4">
          <h2 className="text-xl font-semibold text-slate-950">Existing Admin Users</h2>
          {users.length === 0 ? <AdminBanner title="No admin users found" /> : users.map((user) => (
            <article className="rounded-xl border border-slate-200 bg-white p-5" key={user.id}>
              <div className="space-y-2"><h3 className="text-xl font-semibold text-slate-950">{user.name ?? user.email}</h3><p className="text-sm text-slate-600">{user.email} · {user.role} · {user.isActive ? "Active" : "Inactive"}</p></div>
              <form action={`/api/admin/users/${user.id}`} className="mt-4 grid gap-4 md:grid-cols-[180px_180px_auto] md:items-end" method="post">
                <input name="intent" type="hidden" value="update" />
                <label className="block space-y-2"><span className="text-sm font-medium text-slate-900">Name</span><input className="input-base" defaultValue={user.name ?? ""} name="name" required /></label>
                <label className="block space-y-2"><span className="text-sm font-medium text-slate-900">Role</span><select className="input-base" defaultValue={user.role} name="role"><option value={AdminRole.SUPER_ADMIN}>Super Admin</option><option value={AdminRole.EDITOR}>Editor</option></select></label>
                <div className="flex flex-wrap gap-3"><button className="btn-secondary" type="submit">Save</button><button className="btn-secondary" formAction={`/api/admin/users/${user.id}`} name="intent" type="submit" value={user.isActive ? "deactivate" : "activate"}>{user.isActive ? "Deactivate" : "Activate"}</button><button className="inline-flex min-h-11 items-center justify-center rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700" formAction={`/api/admin/users/${user.id}`} name="intent" type="submit" value="delete">Delete</button></div>
              </form>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
