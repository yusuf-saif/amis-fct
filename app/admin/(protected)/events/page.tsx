import Link from "next/link";
import { AdminRole, PublishingStatus } from "@prisma/client";

import { AdminBanner } from "@/components/admin/admin-banner";
import { requireAdminUser } from "@/lib/auth";
import { getEventStatusLabel } from "@/lib/content";
import { prisma } from "@/lib/db";

export default async function AdminEventsPage({ searchParams }: { searchParams: Promise<{ feedback?: string }> }) {
  await requireAdminUser([AdminRole.SUPER_ADMIN, AdminRole.EDITOR]);

  const params = await searchParams;
  const events = await prisma.event.findMany({ orderBy: [{ startAt: "asc" }, { createdAt: "desc" }] });

  return (
    <div className="space-y-6">
      <div className="card-admin space-y-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-[0.08em] text-brand-green-700">Events</p>
            <h1 className="text-3xl font-semibold text-slate-950">Events</h1>
            <p className="max-w-3xl text-sm text-slate-600">Manage upcoming and completed AMIS FCT events for the public calendar.</p>
          </div>
          <Link className="btn-primary" href="/admin/events/new">Create Event</Link>
        </div>
        {params.feedback ? <AdminBanner title={params.feedback.replace(/-/g, " ")} tone="success" /> : null}
      </div>

      <div className="card-admin space-y-4">
        {events.length === 0 ? (
          <AdminBanner title="No events created yet" />
        ) : (
          <div className="space-y-4">
            {events.map((event) => (
              <article className="rounded-xl border border-slate-200 bg-white p-5" key={event.id}>
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div className="space-y-2">
                    <h2 className="text-xl font-semibold text-slate-950">{event.title}</h2>
                    <p className="text-sm text-slate-600">{getEventStatusLabel(event.status)} · {event.location} · {event.startAt.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</p>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <Link className="btn-secondary" href={`/admin/events/${event.id}`}>Edit</Link>
                    <form action={`/api/admin/events/${event.id}`} method="post"><input name="intent" type="hidden" value={event.status === PublishingStatus.ARCHIVED ? "mark_upcoming" : "mark_completed"} /><button className="btn-secondary" type="submit">{event.status === PublishingStatus.ARCHIVED ? "Mark Upcoming" : "Mark Completed"}</button></form>
                    <form action={`/api/admin/events/${event.id}`} method="post"><input name="intent" type="hidden" value="delete" /><button className="inline-flex min-h-11 items-center justify-center rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700" type="submit">Delete</button></form>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
