import Link from "next/link";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-10 px-6 py-10 md:px-10 md:py-16">
      <section className="overflow-hidden rounded-[24px] border border-brand-green-100 bg-brand-green-900 text-ink-inverse shadow-public2">
        <div className="grid gap-8 px-6 py-10 md:grid-cols-[1.2fr_0.8fr] md:px-10 md:py-14">
          <div className="space-y-6">
            <p className="font-arabic text-2xl text-brand-gold-100" dir="rtl" lang="ar">
              بسم الله الرحمن الرحيم
            </p>
            <div className="space-y-4">
              <p className="text-sm font-semibold uppercase tracking-[0.08em] text-brand-gold-200">
                Association of Model Islamic Schools, FCT
              </p>
              <h1 className="max-w-3xl text-[var(--font-size-hero-fluid)] font-bold leading-tight">
                Phase 0 and Phase 1 foundation is ready for the AMIS FCT rebuild.
              </h1>
              <p className="max-w-2xl text-base text-emerald-50/90 md:text-lg">
                The public experience has not been built yet. This phase establishes the application structure, design tokens,
                database schema, admin authentication, and seed data required for controlled delivery.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link className="btn-primary" href="/admin/login">
                Open Admin Login
              </Link>
              <span className="btn-secondary cursor-default border-brand-gold-200 text-brand-gold-100 hover:bg-transparent">
                Public site build starts in the next phase
              </span>
            </div>
          </div>
          <div className="card-public self-start bg-brand-green-800/70 text-ink-inverse">
            <h2 className="text-2xl font-semibold text-brand-gold-100">Phase Scope</h2>
            <ul className="mt-4 space-y-3 text-sm text-emerald-50/90">
              <li>Next.js + TypeScript project scaffold</li>
              <li>Tailwind + AMIS FCT design tokens</li>
              <li>Prisma schema for core entities</li>
              <li>Admin-only login and protected layout</li>
              <li>Super Admin and Editor role model</li>
              <li>Audit log helper and seed data</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
