import Link from "next/link";
import { AdminRole, EventType, PublishingStatus } from "@prisma/client";
import { notFound } from "next/navigation";

import { AdminBanner } from "@/components/admin/admin-banner";
import { requireAdminUser } from "@/lib/auth";
import { prisma } from "@/lib/db";

function toDateTimeLocal(value: Date | null) {
  if (!value) return "";
  return new Date(value.getTime() - value.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
}

export default async function AdminEventDetailPage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ feedback?: string }> }) {
  await requireAdminUser([AdminRole.SUPER_ADMIN, AdminRole.EDITOR]);

  const { id } = await params;
  const query = await searchParams;
  const event = await prisma.event.findUnique({ where: { id } });
  if (!event) notFound();

  return (
    <div className="space-y-6">
      <div className="card-admin space-y-4">
        <Link className="text-sm font-medium text-brand-green-700" href="/admin/events">← Back to Events</Link>
        <div className="space-y-2"><p className="text-sm font-semibold uppercase tracking-[0.08em] text-brand-green-700">Event Detail</p><h1 className="text-3xl font-semibold text-slate-950">{event.title}</h1></div>
        {query.feedback ? <AdminBanner title={query.feedback.replace(/-/g, " ")} tone="success" /> : null}
      </div>

      <div className="card-admin space-y-4">
        <form action={`/api/admin/events/${event.id}`} className="space-y-4" encType="multipart/form-data" method="post">
          <input name="intent" type="hidden" value="update" />
          <label className="block space-y-2"><span className="text-sm font-medium text-slate-900">Title</span><input className="input-base" defaultValue={event.title} name="title" required /></label>
          <label className="block space-y-2"><span className="text-sm font-medium text-slate-900">Summary</span><input className="input-base" defaultValue={event.summary} name="summary" required /></label>
          <label className="block space-y-2"><span className="text-sm font-medium text-slate-900">Description</span><textarea className="input-base min-h-[220px]" defaultValue={event.description} name="description" required /></label>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="block space-y-2"><span className="text-sm font-medium text-slate-900">Location</span><input className="input-base" defaultValue={event.location} name="location" required /></label>
            <label className="block space-y-2"><span className="text-sm font-medium text-slate-900">Event Type</span><select className="input-base" defaultValue={event.eventType} name="eventType">{Object.values(EventType).map((value) => <option key={value} value={value}>{value.replace(/_/g, " ")}</option>)}</select></label>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="block space-y-2"><span className="text-sm font-medium text-slate-900">Start date/time</span><input className="input-base" defaultValue={toDateTimeLocal(event.startAt)} name="startAt" required type="datetime-local" /></label>
            <label className="block space-y-2"><span className="text-sm font-medium text-slate-900">End date/time</span><input className="input-base" defaultValue={toDateTimeLocal(event.endAt)} name="endAt" type="datetime-local" /></label>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="block space-y-2"><span className="text-sm font-medium text-slate-900">Registration contact</span><input className="input-base" defaultValue={event.registrationContact ?? ""} name="registrationContact" /></label>
            <label className="block space-y-2"><span className="text-sm font-medium text-slate-900">Map URL</span><input className="input-base" defaultValue={event.mapUrl ?? ""} name="mapUrl" /></label>
          </div>
          <label className="block space-y-2"><span className="text-sm font-medium text-slate-900">Status</span><select className="input-base" defaultValue={event.status} name="status"><option value={PublishingStatus.DRAFT}>Draft</option><option value={PublishingStatus.PUBLISHED}>Upcoming</option><option value={PublishingStatus.ARCHIVED}>Completed</option></select></label>
          <label className="block space-y-2"><span className="text-sm font-medium text-slate-900">Replace attachment</span><input accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,image/jpeg,image/png" className="input-base pt-3" name="attachment" type="file" /></label>
          {event.attachmentUrl ? <a className="text-sm font-medium text-brand-green-700" href={event.attachmentUrl}>Download current attachment</a> : null}
          <button className="btn-primary" type="submit">Save Changes</button>
        </form>
      </div>
    </div>
  );
}
