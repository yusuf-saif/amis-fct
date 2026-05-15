import Link from "next/link";
import { AdminRole } from "@prisma/client";

import { AdminBanner } from "@/components/admin/admin-banner";
import { requireAdminUser } from "@/lib/auth";
import { prisma } from "@/lib/db";

export default async function AdminEnquiriesPage({ searchParams }: { searchParams: Promise<{ feedback?: string }> }) {
  await requireAdminUser([AdminRole.SUPER_ADMIN]);
  const params = await searchParams;
  const enquiries = await prisma.contactEnquiry.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="space-y-6">
      <div className="card-admin space-y-4">
        <div className="space-y-2"><p className="text-sm font-semibold uppercase tracking-[0.08em] text-brand-green-700">Enquiries</p><h1 className="text-3xl font-semibold text-slate-950">Contact enquiries inbox</h1></div>
        {params.feedback ? <AdminBanner title={params.feedback.replace(/-/g, " ")} tone="success" /> : null}
      </div>

      <div className="card-admin space-y-4">
        {enquiries.length === 0 ? <AdminBanner title="No enquiries received yet" /> : enquiries.map((enquiry) => (
          <article className="rounded-xl border border-slate-200 bg-white p-5" key={enquiry.id}>
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div className="space-y-2">
                <h2 className="text-xl font-semibold text-slate-950">{enquiry.fullName}</h2>
                <p className="text-sm text-slate-600">{enquiry.subject} · {enquiry.email} · {enquiry.isRead ? "Reviewed" : "New"}</p>
                <p className="text-sm text-slate-700">{enquiry.message}</p>
                {enquiry.attachmentUrl ? <a className="text-sm font-medium text-brand-green-700" href={enquiry.attachmentUrl}>Download attachment</a> : null}
              </div>
              <div className="flex flex-wrap gap-3">
                {!enquiry.isRead ? <form action={`/api/admin/enquiries/${enquiry.id}`} method="post"><input name="intent" type="hidden" value="review" /><button className="btn-secondary" type="submit">Mark Reviewed</button></form> : null}
                <form action={`/api/admin/enquiries/${enquiry.id}`} method="post"><input name="intent" type="hidden" value="delete" /><button className="inline-flex min-h-11 items-center justify-center rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700" type="submit">Delete</button></form>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
