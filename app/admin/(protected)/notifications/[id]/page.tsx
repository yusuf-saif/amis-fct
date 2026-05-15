import Link from "next/link";
import { AdminRole, DuesStatus, NotificationStatus, SchoolLevel } from "@prisma/client";
import { notFound } from "next/navigation";

import { AdminBanner } from "@/components/admin/admin-banner";
import { requireAdminUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { AREA_COUNCILS } from "@/lib/schools";
import { isDraftNotification, resolveNotificationRecipients, type NotificationAudienceFilters } from "@/lib/notifications";

export default async function AdminNotificationDetailPage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ feedback?: string }> }) {
  await requireAdminUser([AdminRole.SUPER_ADMIN]);
  const { id } = await params;
  const query = await searchParams;

  const notification = await prisma.notification.findUnique({ where: { id }, include: { sender: true } });
  if (!notification) notFound();

  const recipients = await resolveNotificationRecipients(notification.audienceFilters as NotificationAudienceFilters);
  const isDraft = isDraftNotification(notification);

  return (
    <div className="space-y-6">
      <div className="card-admin space-y-4">
        <Link className="text-sm font-medium text-brand-green-700" href="/admin/notifications">← Back to Notifications</Link>
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.08em] text-brand-green-700">Notification Detail</p>
          <h1 className="text-3xl font-semibold text-slate-950">{notification.subject}</h1>
          <p className="text-sm text-slate-600">{notification.status === NotificationStatus.SENT ? "Sent" : "Draft"} · Audience: {notification.audienceDescription}</p>
        </div>
        {query.feedback ? <AdminBanner title={query.feedback.replace(/-/g, " ")} tone="success" /> : null}
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-6">
          <div className="card-admin space-y-4">
            <h2 className="text-xl font-semibold text-slate-950">Audience & Delivery</h2>
            <p className="text-sm text-slate-600">Recipients matched: {recipients.length}</p>
            <div className="max-h-64 overflow-y-auto rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
              {recipients.length === 0 ? "No recipients matched this notification audience." : recipients.slice(0, 20).map((recipient) => <div key={recipient.id}>{recipient.name} · {recipient.email}</div>)}
            </div>
            {notification.attachmentUrl ? <a className="text-sm font-medium text-brand-green-700" href={notification.attachmentUrl}>Download attachment</a> : null}
            {notification.sentAt ? <p className="text-sm text-slate-600">Sent at {notification.sentAt.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</p> : null}
          </div>
        </div>

        <div className="card-admin space-y-4">
          <h2 className="text-xl font-semibold text-slate-950">{isDraft ? "Edit Draft" : "Notification Message"}</h2>
          {isDraft ? (
            <form action={`/api/admin/notifications/${notification.id}`} className="space-y-5" encType="multipart/form-data" method="post">
              <input name="intent" type="hidden" value="update" />
              <label className="block space-y-2"><span className="text-sm font-medium text-slate-900">Title</span><input className="input-base" defaultValue={notification.subject} name="title" required /></label>
              <label className="block space-y-2"><span className="text-sm font-medium text-slate-900">Message Body</span><textarea className="input-base min-h-[220px]" defaultValue={notification.body} name="body" required /></label>
              <label className="block space-y-2"><span className="text-sm font-medium text-slate-900">Attachment</span><input accept="application/pdf,image/jpeg,image/png" className="input-base pt-3" name="attachment" type="file" /></label>
              <label className="block space-y-2"><span className="text-sm font-medium text-slate-900">Audience Type</span><select className="input-base" defaultValue={(notification.audienceFilters as NotificationAudienceFilters).audienceType} name="audienceType"><option value="ALL">All schools</option><option value="AREA_COUNCIL">Area Council(s)</option><option value="SCHOOL_LEVEL">School Level(s)</option><option value="DUES_STATUS">Dues Status</option><option value="INDIVIDUAL">Individual school(s)</option></select></label>
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <fieldset className="space-y-2"><legend className="text-sm font-medium text-slate-900">Area Councils</legend>{AREA_COUNCILS.map((value) => <label className="flex items-center gap-2 text-sm text-slate-700" key={value}><input defaultChecked={((notification.audienceFilters as NotificationAudienceFilters).areaCouncils ?? []).includes(value)} name="areaCouncils" type="checkbox" value={value} />{value}</label>)}</fieldset>
                <fieldset className="space-y-2"><legend className="text-sm font-medium text-slate-900">School Levels</legend>{Object.values(SchoolLevel).map((value) => <label className="flex items-center gap-2 text-sm text-slate-700" key={value}><input defaultChecked={((notification.audienceFilters as NotificationAudienceFilters).schoolLevels ?? []).includes(value)} name="schoolLevels" type="checkbox" value={value} />{value}</label>)}</fieldset>
                <fieldset className="space-y-2"><legend className="text-sm font-medium text-slate-900">Dues Status</legend>{Object.values(DuesStatus).map((value) => <label className="flex items-center gap-2 text-sm text-slate-700" key={value}><input defaultChecked={((notification.audienceFilters as NotificationAudienceFilters).duesStatuses ?? []).includes(value)} name="duesStatuses" type="checkbox" value={value} />{value}</label>)}</fieldset>
                <fieldset className="space-y-2"><legend className="text-sm font-medium text-slate-900">Individual Schools</legend><div className="max-h-48 overflow-y-auto space-y-2 pr-2">{recipients.map((school) => <label className="flex items-center gap-2 text-sm text-slate-700" key={school.id}><input defaultChecked={((notification.audienceFilters as NotificationAudienceFilters).schoolIds ?? []).includes(school.id)} name="schoolIds" type="checkbox" value={school.id} />{school.name}</label>)}</div></fieldset>
              </div>
              <div className="flex flex-wrap gap-3">
                <button className="btn-primary" type="submit">Save Draft</button>
                <form action="/api/admin/notifications/send" method="post">
                  <input name="notificationId" type="hidden" value={notification.id} />
                  <button className="btn-secondary" type="submit">Send Now</button>
                </form>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm leading-relaxed text-slate-700 whitespace-pre-line">{notification.body}</div>
              <p className="text-sm text-slate-600">Sent notifications are read-only for audit integrity.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
