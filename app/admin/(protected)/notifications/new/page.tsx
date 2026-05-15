import { AdminRole, DuesStatus, NotificationStatus, SchoolLevel } from "@prisma/client";

import { requireAdminUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { AREA_COUNCILS } from "@/lib/schools";

export default async function AdminNotificationsNewPage() {
  await requireAdminUser([AdminRole.SUPER_ADMIN]);
  const schools = await prisma.school.findMany({ where: { status: "APPROVED" }, orderBy: { name: "asc" }, select: { id: true, name: true } });

  return (
    <div className="card-admin space-y-6">
      <div className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-[0.08em] text-brand-green-700">Create Notification</p>
        <h1 className="text-3xl font-semibold text-slate-950">New notification</h1>
        <p className="text-sm text-slate-600">NDPR notice: message content and recipient selection should only include information appropriate for official association communication.</p>
      </div>

      <form action="/api/admin/notifications" className="space-y-5" encType="multipart/form-data" method="post">
        <label className="block space-y-2"><span className="text-sm font-medium text-slate-900">Title</span><input className="input-base" name="title" required /></label>
        <label className="block space-y-2"><span className="text-sm font-medium text-slate-900">Message Body</span><textarea className="input-base min-h-[220px]" name="body" required /></label>
        <label className="block space-y-2"><span className="text-sm font-medium text-slate-900">Attachment (optional)</span><input accept="application/pdf,image/jpeg,image/png" className="input-base pt-3" name="attachment" type="file" /></label>

        <fieldset className="space-y-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
          <legend className="px-1 text-sm font-medium text-slate-900">Audience</legend>
          <label className="block space-y-2"><span className="text-sm font-medium text-slate-900">Audience Type</span><select className="input-base" defaultValue="ALL" name="audienceType"><option value="ALL">All schools</option><option value="AREA_COUNCIL">Area Council(s)</option><option value="SCHOOL_LEVEL">School Level(s)</option><option value="DUES_STATUS">Dues Status</option><option value="INDIVIDUAL">Individual school(s)</option></select></label>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <fieldset className="space-y-2"><legend className="text-sm font-medium text-slate-900">Area Councils</legend>{AREA_COUNCILS.map((value) => <label className="flex items-center gap-2 text-sm text-slate-700" key={value}><input name="areaCouncils" type="checkbox" value={value} />{value}</label>)}</fieldset>
            <fieldset className="space-y-2"><legend className="text-sm font-medium text-slate-900">School Levels</legend>{Object.values(SchoolLevel).map((value) => <label className="flex items-center gap-2 text-sm text-slate-700" key={value}><input name="schoolLevels" type="checkbox" value={value} />{value}</label>)}</fieldset>
            <fieldset className="space-y-2"><legend className="text-sm font-medium text-slate-900">Dues Status</legend>{Object.values(DuesStatus).map((value) => <label className="flex items-center gap-2 text-sm text-slate-700" key={value}><input name="duesStatuses" type="checkbox" value={value} />{value}</label>)}</fieldset>
            <fieldset className="space-y-2"><legend className="text-sm font-medium text-slate-900">Individual Schools</legend><div className="max-h-48 overflow-y-auto space-y-2 pr-2">{schools.map((school) => <label className="flex items-center gap-2 text-sm text-slate-700" key={school.id}><input name="schoolIds" type="checkbox" value={school.id} />{school.name}</label>)}</div></fieldset>
          </div>
        </fieldset>

        <fieldset className="space-y-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
          <legend className="px-1 text-sm font-medium text-slate-900">Schedule</legend>
          <p className="text-sm text-slate-600">Scheduling is reserved for a future implementation. For now, save as Draft or Send Now.</p>
          <input className="input-base" disabled type="datetime-local" />
        </fieldset>

        <div className="flex flex-wrap gap-3">
          <button className="btn-secondary" name="status" type="submit" value={NotificationStatus.DRAFT}>Save Draft</button>
          <button className="btn-primary" name="status" type="submit" value={NotificationStatus.SENT}>Send Now</button>
        </div>
      </form>
    </div>
  );
}
