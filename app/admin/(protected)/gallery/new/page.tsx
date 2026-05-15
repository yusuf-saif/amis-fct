import { AdminRole, PublishingStatus } from "@prisma/client";

import { requireAdminUser } from "@/lib/auth";
import { prisma } from "@/lib/db";

export default async function AdminGalleryNewPage() {
  await requireAdminUser([AdminRole.SUPER_ADMIN, AdminRole.EDITOR]);
  const events = await prisma.event.findMany({ orderBy: { startAt: "desc" }, select: { id: true, title: true } });

  return (
    <div className="card-admin space-y-6">
      <div className="space-y-2"><p className="text-sm font-semibold uppercase tracking-[0.08em] text-brand-green-700">Create Album</p><h1 className="text-3xl font-semibold text-slate-950">New gallery album</h1></div>
      <form action="/api/admin/gallery" className="space-y-4" encType="multipart/form-data" method="post">
        <label className="block space-y-2"><span className="text-sm font-medium text-slate-900">Title</span><input className="input-base" name="title" required /></label>
        <label className="block space-y-2"><span className="text-sm font-medium text-slate-900">Description</span><textarea className="input-base min-h-[180px]" name="summary" /></label>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="block space-y-2"><span className="text-sm font-medium text-slate-900">Event Date</span><input className="input-base" name="eventDate" required type="datetime-local" /></label>
          <label className="block space-y-2"><span className="text-sm font-medium text-slate-900">Linked Event (optional)</span><select className="input-base" name="eventId"><option value="">None</option>{events.map((event) => <option key={event.id} value={event.id}>{event.title}</option>)}</select></label>
        </div>
        <label className="block space-y-2"><span className="text-sm font-medium text-slate-900">Status</span><select className="input-base" defaultValue={PublishingStatus.PUBLISHED} name="status"><option value={PublishingStatus.DRAFT}>Draft</option><option value={PublishingStatus.PUBLISHED}>Published</option></select></label>
        <label className="block space-y-2"><span className="text-sm font-medium text-slate-900">Cover Photo</span><input accept="image/jpeg,image/png" className="input-base pt-3" name="coverPhoto" required type="file" /></label>
        <label className="block space-y-2"><span className="text-sm font-medium text-slate-900">Album Photos</span><input accept="image/jpeg,image/png" className="input-base pt-3" multiple name="photos" required type="file" /></label>
        <button className="btn-primary" type="submit">Create Album</button>
      </form>
    </div>
  );
}
