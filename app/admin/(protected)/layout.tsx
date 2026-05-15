import Link from "next/link";

import { AdminRole } from "@prisma/client";

import { LogoutButton } from "@/components/admin/logout-button";
import { requireAdminUser } from "@/lib/auth";

const navigationByRole: Array<{
  href: string;
  label: string;
  roles: AdminRole[];
}> = [
  { href: "/admin/dashboard", label: "Dashboard", roles: [AdminRole.SUPER_ADMIN, AdminRole.EDITOR] },
  { href: "/admin/news", label: "News", roles: [AdminRole.SUPER_ADMIN, AdminRole.EDITOR] },
  { href: "/admin/events", label: "Events", roles: [AdminRole.SUPER_ADMIN, AdminRole.EDITOR] },
  { href: "/admin/resources", label: "Resources", roles: [AdminRole.SUPER_ADMIN, AdminRole.EDITOR] },
  { href: "/admin/gallery", label: "Gallery", roles: [AdminRole.SUPER_ADMIN, AdminRole.EDITOR] },
  { href: "/admin/leadership", label: "Leadership", roles: [AdminRole.SUPER_ADMIN, AdminRole.EDITOR] },
  { href: "/admin/schools", label: "Schools", roles: [AdminRole.SUPER_ADMIN] },
  { href: "/admin/dues", label: "Dues", roles: [AdminRole.SUPER_ADMIN] },
  { href: "/admin/notifications", label: "Notifications", roles: [AdminRole.SUPER_ADMIN] },
  { href: "/admin/enquiries", label: "Enquiries", roles: [AdminRole.SUPER_ADMIN] },
  { href: "/admin/users", label: "Users", roles: [AdminRole.SUPER_ADMIN] },
  { href: "/admin/audit-log", label: "Audit Log", roles: [AdminRole.SUPER_ADMIN] },
];

export default async function AdminProtectedLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const user = await requireAdminUser();
  const navigation = navigationByRole.filter((item) => item.roles.includes(user.role));

  return (
    <div className="admin-shell lg:grid lg:grid-cols-[240px_minmax(0,1fr)]">
      <aside className="border-b border-slate-800 bg-admin-sidebar px-5 py-6 text-white lg:min-h-screen lg:border-b-0 lg:border-r lg:px-4">
        <div className="space-y-6">
          <div className="space-y-2 px-2">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-brand-green-100">AMIS FCT</p>
            <h1 className="text-lg font-semibold text-white">Admin Dashboard</h1>
            <div className="rounded-lg bg-white/5 px-3 py-2 text-xs text-slate-300">
              Signed in as <span className="font-semibold text-white">{user.email}</span>
              <div className="mt-1 text-brand-green-100">{user.role === AdminRole.SUPER_ADMIN ? "Super Admin" : "Editor"}</div>
            </div>
          </div>

          <nav aria-label="Admin navigation" className="space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.href}
                className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-200 transition hover:bg-white/10 hover:text-white"
                href={item.href}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="px-2">
            <LogoutButton />
          </div>
        </div>
      </aside>

      <div className="min-w-0">
        <header className="border-b border-admin-line bg-admin-card px-6 py-4">
          <p className="text-sm text-slate-600">Role-protected internal workspace for content, schools, dues, notifications, and audit review.</p>
        </header>
        <main className="px-6 py-6 md:px-8">{children}</main>
      </div>
    </div>
  );
}
