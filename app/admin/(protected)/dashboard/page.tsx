import { AdminRole, DuesStatus, SchoolStatus } from "@prisma/client";

import { requireAdminUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { computeBalance, getCurrentDuesSetting } from "@/lib/dues";

export default async function AdminDashboardPage() {
  const user = await requireAdminUser();
  const currentDuesSetting = await getCurrentDuesSetting();

  const [pendingSchools, unreadEnquiries, duesPaid, duesPartial, duesUnpaid, totalCollected, totalOutstanding, newsCount, eventCount] = await Promise.all([
    prisma.school.count({ where: { status: SchoolStatus.PENDING } }),
    prisma.contactEnquiry.count({ where: { isRead: false } }),
    prisma.duesRecord.count({ where: { status: DuesStatus.PAID, ...(currentDuesSetting ? { academicYear: currentDuesSetting.academicYear } : {}) } }),
    prisma.duesRecord.count({ where: { status: DuesStatus.PARTIAL, ...(currentDuesSetting ? { academicYear: currentDuesSetting.academicYear } : {}) } }),
    prisma.duesRecord.count({ where: { status: DuesStatus.UNPAID, ...(currentDuesSetting ? { academicYear: currentDuesSetting.academicYear } : {}) } }),
    prisma.duesRecord.aggregate({ _sum: { amountPaid: true }, where: currentDuesSetting ? { academicYear: currentDuesSetting.academicYear } : undefined }),
    prisma.duesRecord.findMany({ select: { amountDue: true, amountPaid: true }, where: currentDuesSetting ? { academicYear: currentDuesSetting.academicYear } : undefined }),
    prisma.newsPost.count(),
    prisma.event.count(),
  ]);

  const outstandingAmount = totalOutstanding.reduce((sum, record) => sum + computeBalance(record.amountDue, record.amountPaid), 0);

  const cards = [
    { label: "Pending school applications", value: pendingSchools, tone: "text-amber-700 bg-amber-50 border-amber-200" },
    { label: "Unread contact enquiries", value: unreadEnquiries, tone: "text-sky-700 bg-sky-50 border-sky-200" },
    { label: "News posts seeded", value: newsCount, tone: "text-emerald-700 bg-emerald-50 border-emerald-200" },
    { label: "Events seeded", value: eventCount, tone: "text-violet-700 bg-violet-50 border-violet-200" },
  ];

  return (
    <div className="space-y-6">
      <section className="card-admin space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.08em] text-brand-green-700">Overview</p>
        <h1 className="text-3xl font-semibold text-slate-950">Welcome back</h1>
        <p className="max-w-3xl text-sm text-slate-600">
          {user.role === AdminRole.SUPER_ADMIN
            ? "You have full control over admin users, schools, dues, notifications, and system audit history."
            : "Your account can manage editorial content and leadership records, while restricted areas stay server-protected."}
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <article key={card.label} className={`rounded-xl border p-5 ${card.tone}`}>
            <p className="text-sm font-medium">{card.label}</p>
            <p className="mt-3 text-3xl font-semibold">{card.value}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <article className="card-admin">
          <h2 className="text-xl font-semibold text-slate-950">Current dues summary</h2>
          <p className="mt-2 text-sm text-slate-600">{currentDuesSetting ? currentDuesSetting.academicYear : "No current academic year set"}</p>
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-800">
              <p className="text-sm font-medium">Paid</p>
              <p className="mt-2 text-2xl font-semibold">{duesPaid}</p>
            </div>
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-amber-800">
              <p className="text-sm font-medium">Partial</p>
              <p className="mt-2 text-2xl font-semibold">{duesPartial}</p>
            </div>
            <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-800">
              <p className="text-sm font-medium">Unpaid</p>
              <p className="mt-2 text-2xl font-semibold">{duesUnpaid}</p>
            </div>
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-800">
              <p className="text-sm font-medium">Total Collected</p>
              <p className="mt-2 text-2xl font-semibold">₦{(totalCollected._sum.amountPaid ?? 0).toLocaleString()}</p>
            </div>
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-amber-800">
              <p className="text-sm font-medium">Total Outstanding</p>
              <p className="mt-2 text-2xl font-semibold">₦{outstandingAmount.toLocaleString()}</p>
            </div>
          </div>
        </article>

        <article className="card-admin">
          <h2 className="text-xl font-semibold text-slate-950">Role access</h2>
          <ul className="mt-4 space-y-3 text-sm text-slate-600">
            <li>Super Admin: full platform access including users, dues, schools, notifications, and audit log.</li>
            <li>Editor: news, events, resources, gallery, and leadership only.</li>
            <li>Protected pages validate the session on the server before rendering.</li>
          </ul>
        </article>
      </section>
    </div>
  );
}
