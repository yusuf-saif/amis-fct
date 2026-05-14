import Link from "next/link";

export default function AdminForbiddenPage() {
  return (
    <main className="admin-shell flex min-h-screen items-center justify-center px-6 py-10">
      <div className="card-admin max-w-xl space-y-4 text-center">
        <h1 className="text-3xl font-semibold text-slate-950">Access denied</h1>
        <p className="text-sm text-slate-600">Your role does not have permission to access this admin area.</p>
        <Link className="btn-primary" href="/admin/dashboard">
          Return to Dashboard
        </Link>
      </div>
    </main>
  );
}
