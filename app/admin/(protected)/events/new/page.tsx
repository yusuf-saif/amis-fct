import { AdminRole, EventType, PublishingStatus } from "@prisma/client";

import { requireAdminUser } from "@/lib/auth";

export default async function AdminEventsNewPage() {
  await requireAdminUser([AdminRole.SUPER_ADMIN, AdminRole.EDITOR]);

  return (
    <div className="card-admin space-y-6">
      <div className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-[0.08em] text-brand-green-700">Create Event</p>
        <h1 className="text-3xl font-semibold text-slate-950">New event</h1>
      </div>

      <form action="/api/admin/events" className="space-y-4" encType="multipart/form-data" method="post">
        <label className="block space-y-2"><span className="text-sm font-medium text-slate-900">Title</span><input className="input-base" name="title" required /></label>
        <label className="block space-y-2"><span className="text-sm font-medium text-slate-900">Summary</span><input className="input-base" name="summary" required /></label>
        <label className="block space-y-2"><span className="text-sm font-medium text-slate-900">Description</span><textarea className="input-base min-h-[220px]" name="description" required /></label>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="block space-y-2"><span className="text-sm font-medium text-slate-900">Location</span><input className="input-base" name="location" required /></label>
          <label className="block space-y-2"><span className="text-sm font-medium text-slate-900">Event Type</span><select className="input-base" defaultValue={EventType.ASSOCIATION_MEETING} name="eventType">{Object.values(EventType).map((value) => <option key={value} value={value}>{value.replace(/_/g, " ")}</option>)}</select></label>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="block space-y-2"><span className="text-sm font-medium text-slate-900">Start date/time</span><input className="input-base" name="startAt" required type="datetime-local" /></label>
          <label className="block space-y-2"><span className="text-sm font-medium text-slate-900">End date/time</span><input className="input-base" name="endAt" type="datetime-local" /></label>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="block space-y-2"><span className="text-sm font-medium text-slate-900">Registration contact</span><input className="input-base" name="registrationContact" /></label>
          <label className="block space-y-2"><span className="text-sm font-medium text-slate-900">Map URL</span><input className="input-base" name="mapUrl" /></label>
        </div>
        <label className="block space-y-2"><span className="text-sm font-medium text-slate-900">Status</span><select className="input-base" defaultValue={PublishingStatus.PUBLISHED} name="status"><option value={PublishingStatus.DRAFT}>Draft</option><option value={PublishingStatus.PUBLISHED}>Upcoming</option><option value={PublishingStatus.ARCHIVED}>Completed</option></select></label>
        <label className="block space-y-2"><span className="text-sm font-medium text-slate-900">Attachment</span><input accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,image/jpeg,image/png" className="input-base pt-3" name="attachment" type="file" /></label>
        <button className="btn-primary" type="submit">Create Event</button>
      </form>
    </div>
  );
}
