import Link from "next/link";

import { getCurrentAdminUser } from "@/lib/auth";

const errorMessages: Record<string, string> = {
  invalid_credentials: "Invalid email or password.",
  session_expired: "Your session expired. Please sign in again.",
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const existingUser = await getCurrentAdminUser();

  if (existingUser) {
    return (
      <main className="admin-shell flex min-h-screen items-center justify-center px-6 py-10">
        <div className="card-admin max-w-lg space-y-4 text-center">
          <h1 className="text-2xl font-semibold">You are already signed in</h1>
          <p className="text-sm text-slate-600">Continue to the admin dashboard.</p>
          <Link className="btn-primary w-full" href="/admin/dashboard">
            Go to Dashboard
          </Link>
        </div>
      </main>
    );
  }

  const params = await searchParams;
  const error = params.error ? errorMessages[params.error] ?? errorMessages.invalid_credentials : null;

  return (
    <main className="admin-shell grid min-h-screen lg:grid-cols-[1.1fr_0.9fr]">
      <section className="hidden bg-admin-sidebar px-10 py-12 text-white lg:flex lg:flex-col lg:justify-between">
        <div className="space-y-6">
          <p className="inline-flex rounded-full bg-brand-green-600/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-brand-green-100">
            Admin Platform
          </p>
          <div className="space-y-4">
            <h1 className="max-w-md text-4xl font-bold leading-tight">AMIS FCT admin access is role-protected and audit logged.</h1>
            <p className="max-w-xl text-sm leading-6 text-slate-300">
              This workspace separates the public site from internal operations. Only authorised Super Admin and Editor
              accounts can access the dashboard.
            </p>
          </div>
        </div>
        <div className="card-admin bg-slate-900/40 text-left text-slate-100 shadow-none">
          <p className="text-sm font-semibold text-brand-green-100">Phase 1 includes</p>
          <ul className="mt-3 space-y-2 text-sm text-slate-300">
            <li>Server-side session auth</li>
            <li>Super Admin and Editor roles</li>
            <li>Immutable audit log helper</li>
            <li>Prisma-backed content schema</li>
          </ul>
        </div>
      </section>

      <section className="flex items-center justify-center px-6 py-10">
        <div className="card-admin w-full max-w-md space-y-6">
          <div className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-[0.08em] text-brand-green-700">Secure login</p>
            <h2 className="text-3xl font-semibold text-slate-950">Admin sign in</h2>
            <p className="text-sm text-slate-600">Use your AMIS FCT admin email and password.</p>
          </div>

          {error ? (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
          ) : null}

          <form action="/api/admin/login" className="space-y-4" method="post">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-900" htmlFor="email">
                Email address
              </label>
              <input autoComplete="email" className="input-base" id="email" name="email" required type="email" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-900" htmlFor="password">
                Password
              </label>
              <input
                autoComplete="current-password"
                className="input-base"
                id="password"
                minLength={8}
                name="password"
                required
                type="password"
              />
            </div>

            <button className="btn-primary w-full" type="submit">
              Sign In
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
