import Link from "next/link";
import { AdminRole, DuesStatus, DuesTier, Prisma, SchoolStatus } from "@prisma/client";

import { AdminBanner } from "@/components/admin/admin-banner";
import { requireAdminUser } from "@/lib/auth";
import { computeBalance, ensureDuesRecordsForAcademicYear, getBadgeVisibilityEnabled, getCurrentDuesSetting, getDuesTierLabel } from "@/lib/dues";
import { prisma } from "@/lib/db";
import { getSchoolArmLabel } from "@/lib/schools";
import { duesFilterSchema } from "@/lib/validation/dues";

export default async function AdminDuesPage({
  searchParams,
}: {
  searchParams: Promise<{ academicYear?: string; paymentStatus?: DuesStatus; duesTier?: DuesTier; areaCouncil?: string; search?: string; feedback?: string }>;
}) {
  const user = await requireAdminUser([AdminRole.SUPER_ADMIN]);
  const params = await searchParams;
  const parsed = duesFilterSchema.safeParse(params);
  const filters = parsed.success ? parsed.data : {};

  const currentSetting = await getCurrentDuesSetting();
  const selectedAcademicYear = filters.academicYear ?? currentSetting?.academicYear ?? null;
  const badgeVisible = await getBadgeVisibilityEnabled();

  if (selectedAcademicYear) {
    await ensureDuesRecordsForAcademicYear(selectedAcademicYear, user.id);
  }

  const settings = await prisma.duesTierSetting.findMany({ orderBy: { academicYear: "desc" } });

  const where: Prisma.DuesRecordWhereInput = {
    ...(selectedAcademicYear ? { academicYear: selectedAcademicYear } : {}),
    ...(filters.paymentStatus ? { status: filters.paymentStatus } : {}),
    ...(filters.duesTier ? { tier: filters.duesTier } : {}),
    school: {
      status: SchoolStatus.APPROVED,
      ...(filters.areaCouncil ? { areaCouncil: filters.areaCouncil } : {}),
      ...(filters.search ? { name: { contains: filters.search, mode: "insensitive" } } : {}),
    },
  };

  const records = selectedAcademicYear
    ? await prisma.duesRecord.findMany({
        where,
        include: { school: true },
        orderBy: { school: { name: "asc" } },
      })
    : [];

  const summary = records.reduce(
    (acc, record) => {
      const balance = computeBalance(record.amountDue, record.amountPaid);
      acc.totalCollected += record.amountPaid;
      acc.totalOutstanding += balance;
      acc[record.status] += 1;
      return acc;
    },
    { totalCollected: 0, totalOutstanding: 0, [DuesStatus.PAID]: 0, [DuesStatus.PARTIAL]: 0, [DuesStatus.UNPAID]: 0 },
  );

  return (
    <div className="space-y-6">
      <div className="card-admin space-y-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-[0.08em] text-brand-green-700">Dues</p>
            <h1 className="text-3xl font-semibold text-slate-950">Annual dues management</h1>
            <p className="max-w-3xl text-sm text-slate-600">Track approved member school dues by academic year, tier, and payment status.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link className="btn-secondary" href="/admin/dues/settings">Dues Settings</Link>
            {selectedAcademicYear ? <Link className="btn-primary" href={`/api/admin/dues/export?academicYear=${encodeURIComponent(selectedAcademicYear)}${filters.paymentStatus ? `&paymentStatus=${filters.paymentStatus}` : ""}${filters.duesTier ? `&duesTier=${filters.duesTier}` : ""}${filters.areaCouncil ? `&areaCouncil=${encodeURIComponent(filters.areaCouncil)}` : ""}${filters.search ? `&search=${encodeURIComponent(filters.search)}` : ""}`}>Export CSV</Link> : null}
          </div>
        </div>
        {params.feedback ? <AdminBanner title={params.feedback.replace(/-/g, " ")} tone="success" /> : null}
      </div>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <article className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-800"><p className="text-sm font-medium">Total Collected</p><p className="mt-2 text-2xl font-semibold">₦{summary.totalCollected.toLocaleString()}</p></article>
        <article className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-amber-800"><p className="text-sm font-medium">Total Outstanding</p><p className="mt-2 text-2xl font-semibold">₦{summary.totalOutstanding.toLocaleString()}</p></article>
        <article className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-800"><p className="text-sm font-medium">Paid</p><p className="mt-2 text-2xl font-semibold">{summary[DuesStatus.PAID]}</p></article>
        <article className="rounded-xl border border-yellow-200 bg-yellow-50 p-4 text-yellow-800"><p className="text-sm font-medium">Partial</p><p className="mt-2 text-2xl font-semibold">{summary[DuesStatus.PARTIAL]}</p></article>
        <article className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-800"><p className="text-sm font-medium">Unpaid</p><p className="mt-2 text-2xl font-semibold">{summary[DuesStatus.UNPAID]}</p></article>
      </section>

      <div className="card-admin space-y-4">
        <form className="grid gap-4 md:grid-cols-[220px_180px_180px_180px_minmax(0,1fr)_auto] md:items-end" method="get">
          <label className="space-y-2"><span className="text-sm font-medium text-slate-900">Academic Year</span><select className="input-base" defaultValue={selectedAcademicYear ?? ""} name="academicYear"><option value="">Select year</option>{settings.map((setting) => <option key={setting.id} value={setting.academicYear}>{setting.academicYear}</option>)}</select></label>
          <label className="space-y-2"><span className="text-sm font-medium text-slate-900">Payment Status</span><select className="input-base" defaultValue={filters.paymentStatus ?? ""} name="paymentStatus"><option value="">All</option>{Object.values(DuesStatus).map((status) => <option key={status} value={status}>{status}</option>)}</select></label>
          <label className="space-y-2"><span className="text-sm font-medium text-slate-900">Dues Tier</span><select className="input-base" defaultValue={filters.duesTier ?? ""} name="duesTier"><option value="">All</option>{Object.values(DuesTier).map((tier) => <option key={tier} value={tier}>{getDuesTierLabel(tier)}</option>)}</select></label>
          <label className="space-y-2"><span className="text-sm font-medium text-slate-900">Area Council</span><input className="input-base" defaultValue={filters.areaCouncil ?? ""} name="areaCouncil" placeholder="Optional" /></label>
          <label className="space-y-2"><span className="text-sm font-medium text-slate-900">Search by school</span><input className="input-base" defaultValue={filters.search ?? ""} name="search" placeholder="School name" type="search" /></label>
          <button className="btn-primary" type="submit">Apply</button>
        </form>

        <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">Public Active Member badge is currently <span className="font-semibold text-slate-900">{badgeVisible ? "Enabled" : "Disabled"}</span>.</div>

        {!selectedAcademicYear ? (
          <AdminBanner description="Create and mark a dues academic year as current on the settings page to begin tracking." title="No academic year selected" />
        ) : records.length === 0 ? (
          <AdminBanner description="No approved schools or no records match the selected filters." title="No dues records found" />
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-left text-slate-600">
                  <th className="px-3 py-3">School Name</th>
                  <th className="px-3 py-3">Area Council</th>
                  <th className="px-3 py-3">Arms</th>
                  <th className="px-3 py-3">Dues Tier</th>
                  <th className="px-3 py-3">Annual Dues Amount</th>
                  <th className="px-3 py-3">Amount Paid</th>
                  <th className="px-3 py-3">Balance</th>
                  <th className="px-3 py-3">Payment Status</th>
                  <th className="px-3 py-3">Payment Date</th>
                  <th className="px-3 py-3">Academic Year</th>
                  <th className="px-3 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {records.map((record) => {
                  const balance = computeBalance(record.amountDue, record.amountPaid);
                  return (
                    <tr className="border-b border-slate-100" key={record.id}>
                      <td className="px-3 py-3 font-medium text-slate-950">{record.school.name}</td>
                      <td className="px-3 py-3 text-slate-700">{record.school.areaCouncil}</td>
                      <td className="px-3 py-3 text-slate-700">{record.school.arms.map(getSchoolArmLabel).join(", ")}</td>
                      <td className="px-3 py-3 text-slate-700">{getDuesTierLabel(record.tier)}</td>
                      <td className="px-3 py-3 text-slate-700">₦{record.amountDue.toLocaleString()}</td>
                      <td className="px-3 py-3 text-slate-700">₦{record.amountPaid.toLocaleString()}</td>
                      <td className="px-3 py-3 text-slate-700">₦{balance.toLocaleString()}</td>
                      <td className="px-3 py-3 text-slate-700">{record.status}</td>
                      <td className="px-3 py-3 text-slate-700">{record.paymentDate ? record.paymentDate.toLocaleDateString("en-GB") : "-"}</td>
                      <td className="px-3 py-3 text-slate-700">{record.academicYear}</td>
                      <td className="px-3 py-3"><Link className="btn-secondary" href={`/admin/dues/${record.schoolId}?academicYear=${encodeURIComponent(record.academicYear)}`}>Update</Link></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
