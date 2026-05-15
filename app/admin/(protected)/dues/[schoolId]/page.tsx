import Link from "next/link";
import { AdminRole } from "@prisma/client";
import { notFound } from "next/navigation";

import { AdminBanner } from "@/components/admin/admin-banner";
import { requireAdminUser } from "@/lib/auth";
import { computeBalance, ensureDuesRecordsForAcademicYear, getCurrentDuesSetting, getDuesTierLabel } from "@/lib/dues";
import { prisma } from "@/lib/db";

function toDateInput(date: Date | null) {
  return date ? date.toISOString().slice(0, 10) : "";
}

export default async function AdminDuesRecordPage({ params, searchParams }: { params: Promise<{ schoolId: string }>; searchParams: Promise<{ academicYear?: string; feedback?: string }> }) {
  await requireAdminUser([AdminRole.SUPER_ADMIN]);
  const { schoolId } = await params;
  const query = await searchParams;
  const currentSetting = await getCurrentDuesSetting();
  const academicYear = query.academicYear ?? currentSetting?.academicYear;

  const school = await prisma.school.findUnique({ where: { id: schoolId } });
  if (!school || school.status !== "APPROVED") notFound();
  if (!academicYear) notFound();

  await ensureDuesRecordsForAcademicYear(academicYear);
  const record = await prisma.duesRecord.findUnique({ where: { schoolId_academicYear: { schoolId, academicYear } } });
  if (!record) notFound();

  const balance = computeBalance(record.amountDue, record.amountPaid);

  return (
    <div className="space-y-6">
      <div className="card-admin space-y-4">
        <Link className="text-sm font-medium text-brand-green-700" href={`/admin/dues?academicYear=${encodeURIComponent(academicYear)}`}>← Back to Dues</Link>
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.08em] text-brand-green-700">Update Dues Record</p>
          <h1 className="text-3xl font-semibold text-slate-950">{school.name}</h1>
          <p className="text-sm text-slate-600">{academicYear} · {getDuesTierLabel(record.tier)} · Annual amount ₦{record.amountDue.toLocaleString()}</p>
        </div>
        {query.feedback ? <AdminBanner title={query.feedback.replace(/-/g, " ")} tone="success" /> : null}
      </div>

      <div className="card-admin space-y-4">
        <form action={`/api/admin/dues/${schoolId}`} className="space-y-4" method="post">
          <input name="academicYear" type="hidden" value={academicYear} />
          <div className="grid gap-4 md:grid-cols-2">
            <label className="block space-y-2"><span className="text-sm font-medium text-slate-900">School Name</span><input className="input-base" disabled value={school.name} /></label>
            <label className="block space-y-2"><span className="text-sm font-medium text-slate-900">Academic Year</span><input className="input-base" disabled value={academicYear} /></label>
            <label className="block space-y-2"><span className="text-sm font-medium text-slate-900">Dues Tier</span><input className="input-base" disabled value={getDuesTierLabel(record.tier)} /></label>
            <label className="block space-y-2"><span className="text-sm font-medium text-slate-900">Annual Amount</span><input className="input-base" disabled value={`₦${record.amountDue.toLocaleString()}`} /></label>
            <label className="block space-y-2"><span className="text-sm font-medium text-slate-900">Amount Paid</span><input className="input-base" min="0" name="amountPaid" required step="0.01" type="number" defaultValue={record.amountPaid} /></label>
            <label className="block space-y-2"><span className="text-sm font-medium text-slate-900">Payment Date</span><input className="input-base" defaultValue={toDateInput(record.paymentDate)} name="paymentDate" type="date" /></label>
            <label className="block space-y-2"><span className="text-sm font-medium text-slate-900">Payment Status</span><input className="input-base" disabled value={record.status} /></label>
            <label className="block space-y-2"><span className="text-sm font-medium text-slate-900">Balance</span><input className="input-base" disabled value={`₦${balance.toLocaleString()}`} /></label>
          </div>
          <label className="block space-y-2"><span className="text-sm font-medium text-slate-900">Notes</span><textarea className="input-base min-h-[120px]" defaultValue={record.notes ?? ""} name="notes" /></label>
          <button className="btn-primary" type="submit">Save Dues Record</button>
        </form>
      </div>
    </div>
  );
}
