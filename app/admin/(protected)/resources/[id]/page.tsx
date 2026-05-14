import Link from "next/link";
import { AdminRole, PublishingStatus, ResourceCategory } from "@prisma/client";
import { notFound } from "next/navigation";

import { AdminBanner } from "@/components/admin/admin-banner";
import { requireAdminUser } from "@/lib/auth";
import { prisma } from "@/lib/db";

function toDateTimeLocal(value: Date | null) {
  if (!value) return "";
  return new Date(value.getTime() - value.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
}

export default async function AdminResourceDetailPage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ feedback?: string }> }) {
  await requireAdminUser([AdminRole.SUPER_ADMIN, AdminRole.EDITOR]);

  const { id } = await params;
  const query = await searchParams;
  const resource = await prisma.resourceFile.findUnique({ where: { id } });
  if (!resource) notFound();

  return (
    <div className="space-y-6">
      <div className="card-admin space-y-4">
        <Link className="text-sm font-medium text-brand-green-700" href="/admin/resources">← Back to Resources</Link>
        <div className="space-y-2"><p className="text-sm font-semibold uppercase tracking-[0.08em] text-brand-green-700">Resource Detail</p><h1 className="text-3xl font-semibold text-slate-950">{resource.title}</h1></div>
        {query.feedback ? <AdminBanner title={query.feedback.replace(/-/g, " ")} tone="success" /> : null}
      </div>

      <div className="card-admin space-y-4">
        {resource.fileUrl ? <a className="text-sm font-medium text-brand-green-700" href={resource.fileUrl}>Download current file</a> : null}
        <form action={`/api/admin/resources/${resource.id}`} className="space-y-4" encType="multipart/form-data" method="post">
          <input name="intent" type="hidden" value="update" />
          <label className="block space-y-2"><span className="text-sm font-medium text-slate-900">Title</span><input className="input-base" defaultValue={resource.title} name="title" required /></label>
          <label className="block space-y-2"><span className="text-sm font-medium text-slate-900">Category</span><select className="input-base" defaultValue={resource.category} name="category">{Object.values(ResourceCategory).map((value) => <option key={value} value={value}>{value.replace(/_/g, " ")}</option>)}</select></label>
          <label className="block space-y-2"><span className="text-sm font-medium text-slate-900">Description</span><textarea className="input-base min-h-[180px]" defaultValue={resource.description ?? ""} name="description" /></label>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="block space-y-2"><span className="text-sm font-medium text-slate-900">Circular number</span><input className="input-base" defaultValue={resource.circularNumber ?? ""} name="circularNumber" /></label>
            <label className="block space-y-2"><span className="text-sm font-medium text-slate-900">Status</span><select className="input-base" defaultValue={resource.status} name="status"><option value={PublishingStatus.DRAFT}>Inactive</option><option value={PublishingStatus.PUBLISHED}>Active</option></select></label>
          </div>
          <label className="block space-y-2"><span className="text-sm font-medium text-slate-900">Date added</span><input className="input-base" defaultValue={toDateTimeLocal(resource.publishedAt)} name="publishedAt" type="datetime-local" /></label>
          <label className="block space-y-2"><span className="text-sm font-medium text-slate-900">Replace file</span><input accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,image/jpeg,image/png" className="input-base pt-3" name="file" type="file" /></label>
          <button className="btn-primary" type="submit">Save Changes</button>
        </form>
      </div>
    </div>
  );
}
