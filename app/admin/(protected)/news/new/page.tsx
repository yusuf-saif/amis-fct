import { AdminRole, NewsCategory, PublishingStatus } from "@prisma/client";

import { requireAdminUser } from "@/lib/auth";

export default async function AdminNewsNewPage() {
  await requireAdminUser([AdminRole.SUPER_ADMIN, AdminRole.EDITOR]);

  return (
    <div className="card-admin space-y-6">
      <div className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-[0.08em] text-brand-green-700">Create News</p>
        <h1 className="text-3xl font-semibold text-slate-950">New news article</h1>
      </div>

      <form action="/api/admin/news" className="space-y-4" encType="multipart/form-data" method="post">
        <label className="block space-y-2"><span className="text-sm font-medium text-slate-900">Title</span><input className="input-base" name="title" required /></label>
        <label className="block space-y-2"><span className="text-sm font-medium text-slate-900">Category</span><select className="input-base" defaultValue={NewsCategory.GENERAL_NEWS} name="category">{Object.values(NewsCategory).map((value) => <option key={value} value={value}>{value.replace(/_/g, " ")}</option>)}</select></label>
        <label className="block space-y-2"><span className="text-sm font-medium text-slate-900">Body</span><textarea className="input-base min-h-[220px]" name="body" required /></label>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="block space-y-2"><span className="text-sm font-medium text-slate-900">Status</span><select className="input-base" defaultValue={PublishingStatus.DRAFT} name="status"><option value={PublishingStatus.DRAFT}>Draft</option><option value={PublishingStatus.PUBLISHED}>Published</option></select></label>
          <label className="block space-y-2"><span className="text-sm font-medium text-slate-900">Publish date</span><input className="input-base" name="publishedAt" type="datetime-local" /></label>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="block space-y-2"><span className="text-sm font-medium text-slate-900">Featured image</span><input accept="image/jpeg,image/png" className="input-base pt-3" name="featuredImage" type="file" /></label>
          <label className="block space-y-2"><span className="text-sm font-medium text-slate-900">Attachment</span><input accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,image/jpeg,image/png" className="input-base pt-3" name="attachment" type="file" /></label>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="block space-y-2"><span className="text-sm font-medium text-slate-900">Meta title</span><input className="input-base" name="metaTitle" /></label>
          <label className="block space-y-2"><span className="text-sm font-medium text-slate-900">Meta description</span><input className="input-base" name="metaDescription" /></label>
        </div>
        <button className="btn-primary" type="submit">Create Article</button>
      </form>
    </div>
  );
}
