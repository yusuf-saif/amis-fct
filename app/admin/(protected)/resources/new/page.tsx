import { AdminRole, PublishingStatus, ResourceCategory } from "@prisma/client";

import { requireAdminUser } from "@/lib/auth";

export default async function AdminResourcesNewPage() {
  await requireAdminUser([AdminRole.SUPER_ADMIN, AdminRole.EDITOR]);

  return (
    <div className="card-admin space-y-6">
      <div className="space-y-2"><p className="text-sm font-semibold uppercase tracking-[0.08em] text-brand-green-700">Create Resource</p><h1 className="text-3xl font-semibold text-slate-950">New resource</h1></div>
      <form action="/api/admin/resources" className="space-y-4" encType="multipart/form-data" method="post">
        <label className="block space-y-2"><span className="text-sm font-medium text-slate-900">Title</span><input className="input-base" name="title" required /></label>
        <label className="block space-y-2"><span className="text-sm font-medium text-slate-900">Category</span><select className="input-base" defaultValue={ResourceCategory.CIRCULAR} name="category">{Object.values(ResourceCategory).map((value) => <option key={value} value={value}>{value.replace(/_/g, " ")}</option>)}</select></label>
        <label className="block space-y-2"><span className="text-sm font-medium text-slate-900">Description</span><textarea className="input-base min-h-[180px]" name="description" /></label>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="block space-y-2"><span className="text-sm font-medium text-slate-900">Circular number</span><input className="input-base" name="circularNumber" /></label>
          <label className="block space-y-2"><span className="text-sm font-medium text-slate-900">Status</span><select className="input-base" defaultValue={PublishingStatus.PUBLISHED} name="status"><option value={PublishingStatus.DRAFT}>Inactive</option><option value={PublishingStatus.PUBLISHED}>Active</option></select></label>
        </div>
        <label className="block space-y-2"><span className="text-sm font-medium text-slate-900">Date added</span><input className="input-base" name="publishedAt" type="datetime-local" /></label>
        <label className="block space-y-2"><span className="text-sm font-medium text-slate-900">Resource file</span><input accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,image/jpeg,image/png" className="input-base pt-3" name="file" required type="file" /></label>
        <button className="btn-primary" type="submit">Create Resource</button>
      </form>
    </div>
  );
}
