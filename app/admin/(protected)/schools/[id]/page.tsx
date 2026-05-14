import Image from "next/image";
import Link from "next/link";
import { AdminRole, SchoolArm, SchoolStatus } from "@prisma/client";
import { notFound } from "next/navigation";

import { AdminBanner } from "@/components/admin/admin-banner";
import { requireAdminUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { AREA_COUNCILS, getSchoolArmLabel, getSchoolLevelLabel, getSchoolStatusLabel } from "@/lib/schools";

export default async function AdminSchoolDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ status?: string; error?: string }>;
}) {
  await requireAdminUser([AdminRole.SUPER_ADMIN]);

  const { id } = await params;
  const query = await searchParams;
  const school = await prisma.school.findUnique({ where: { id } });

  if (!school) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="card-admin space-y-4">
        <Link className="text-sm font-medium text-brand-green-700" href="/admin/schools">← Back to Schools</Link>
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.08em] text-brand-green-700">School Application</p>
          <h1 className="text-3xl font-semibold text-slate-950">{school.name}</h1>
          <p className="text-sm text-slate-600">Status: {getSchoolStatusLabel(school.status)}</p>
        </div>
        {query.status ? <AdminBanner title={query.status.replace(/-/g, " ")} tone="success" /> : null}
        {query.error ? <AdminBanner title={query.error.replace(/-/g, " ")} tone="error" /> : null}
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-6">
          <div className="card-admin space-y-4">
            <h2 className="text-xl font-semibold text-slate-950">Submitted Details</h2>
            {school.photoUrl ? <Image alt={`${school.name} submitted school photo`} className="h-72 w-full rounded-xl object-cover" height={640} src={school.photoUrl} unoptimized width={960} /> : <div className="flex h-72 items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 text-sm text-slate-500">No photo uploaded</div>}
            <dl className="grid gap-4 text-sm text-slate-700">
              <div><dt className="font-semibold text-slate-950">Area Council</dt><dd>{school.areaCouncil}</dd></div>
              <div><dt className="font-semibold text-slate-950">School Level</dt><dd>{getSchoolLevelLabel(school.level)}</dd></div>
              <div><dt className="font-semibold text-slate-950">Arms</dt><dd>{school.arms.map(getSchoolArmLabel).join(", ")}</dd></div>
              <div><dt className="font-semibold text-slate-950">Principal</dt><dd>{school.principalName}</dd></div>
              <div><dt className="font-semibold text-slate-950">Email</dt><dd>{school.email}</dd></div>
              <div><dt className="font-semibold text-slate-950">Phone</dt><dd>{school.phone}</dd></div>
              <div><dt className="font-semibold text-slate-950">Address</dt><dd>{school.address}</dd></div>
              <div><dt className="font-semibold text-slate-950">Year Established</dt><dd>{school.yearEstablished}</dd></div>
              <div><dt className="font-semibold text-slate-950">Description</dt><dd>{school.description}</dd></div>
              {school.rejectionReason ? <div><dt className="font-semibold text-slate-950">Rejection Reason</dt><dd>{school.rejectionReason}</dd></div> : null}
              {school.moreInfoRequestMessage ? <div><dt className="font-semibold text-slate-950">More Info Message</dt><dd>{school.moreInfoRequestMessage}</dd></div> : null}
            </dl>
          </div>

          <div className="card-admin space-y-4">
            <h2 className="text-xl font-semibold text-slate-950">Approval Workflow</h2>
            <form action={`/api/admin/schools/${school.id}`} className="space-y-4" method="post">
              <input name="intent" type="hidden" value="approve" />
              <button className="btn-primary" type="submit">Approve</button>
            </form>

            <form action={`/api/admin/schools/${school.id}`} className="space-y-3" method="post">
              <input name="intent" type="hidden" value="request_more_info" />
              <label className="block space-y-2">
                <span className="text-sm font-medium text-slate-900">Request More Info Message</span>
                <textarea className="input-base min-h-[120px]" name="message" required />
              </label>
              <button className="btn-secondary" type="submit">Request More Info</button>
            </form>

            <form action={`/api/admin/schools/${school.id}`} className="space-y-3" method="post">
              <input name="intent" type="hidden" value="reject" />
              <label className="block space-y-2">
                <span className="text-sm font-medium text-slate-900">Rejection Reason</span>
                <textarea className="input-base min-h-[120px]" name="rejectionReason" required />
              </label>
              <button className="inline-flex min-h-11 items-center justify-center rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700" type="submit">Reject</button>
            </form>

            {school.status === SchoolStatus.APPROVED ? (
              <form action={`/api/admin/schools/${school.id}`} method="post">
                <input name="intent" type="hidden" value="remove" />
                <button className="inline-flex min-h-11 items-center justify-center rounded-lg border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-700" type="submit">Remove / Deactivate Listing</button>
              </form>
            ) : null}
          </div>
        </div>

        <div className="card-admin space-y-4">
          <h2 className="text-xl font-semibold text-slate-950">Edit Approved School</h2>
          {school.status !== SchoolStatus.APPROVED ? (
            <AdminBanner description="Editing is reserved for approved public listings. Approve the school first if you need to make it visible and maintainable publicly." title="Editing unavailable for this status" />
          ) : (
            <>
              <p className="text-sm text-slate-600">This form updates the approved public listing while preserving audit history.</p>
              <form action={`/api/admin/schools/${school.id}`} className="space-y-4" encType="multipart/form-data" method="post">
                <input name="intent" type="hidden" value="update" />
                <label className="block space-y-2"><span className="text-sm font-medium text-slate-900">School Name</span><input className="input-base" defaultValue={school.name} name="schoolName" required /></label>
                <label className="block space-y-2"><span className="text-sm font-medium text-slate-900">Area Council</span><select className="input-base" defaultValue={school.areaCouncil} name="areaCouncil">{AREA_COUNCILS.map((option) => <option key={option} value={option}>{option}</option>)}</select></label>
                <fieldset className="space-y-3"><legend className="text-sm font-medium text-slate-900">Arms Operated</legend><div className="grid gap-3 sm:grid-cols-2">{([SchoolArm.NURSERY, SchoolArm.PRIMARY, SchoolArm.JSS, SchoolArm.SSS] as const).map((arm) => <label className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700" key={arm}><input defaultChecked={school.arms.includes(arm)} name="arms" type="checkbox" value={arm} />{getSchoolArmLabel(arm)}</label>)}</div></fieldset>
                <label className="block space-y-2"><span className="text-sm font-medium text-slate-900">Principal Name</span><input className="input-base" defaultValue={school.principalName} name="principalName" required /></label>
                <div className="grid gap-4 md:grid-cols-2">
                  <label className="block space-y-2"><span className="text-sm font-medium text-slate-900">Email</span><input className="input-base" defaultValue={school.email} name="email" required type="email" /></label>
                  <label className="block space-y-2"><span className="text-sm font-medium text-slate-900">Phone</span><input className="input-base" defaultValue={school.phone} name="phone" required /></label>
                </div>
                <label className="block space-y-2"><span className="text-sm font-medium text-slate-900">Address</span><input className="input-base" defaultValue={school.address} name="address" required /></label>
                <div className="grid gap-4 md:grid-cols-2">
                  <label className="block space-y-2"><span className="text-sm font-medium text-slate-900">Year Established</span><input className="input-base" defaultValue={school.yearEstablished} name="yearEstablished" required /></label>
                  <label className="block space-y-2"><span className="text-sm font-medium text-slate-900">Arabic Name</span><input className="input-base" defaultValue={school.arabicName ?? ""} name="arabicName" /></label>
                </div>
                <label className="block space-y-2"><span className="text-sm font-medium text-slate-900">Google Map URL</span><input className="input-base" defaultValue={school.googleMapUrl ?? ""} name="googleMapUrl" /></label>
                <label className="block space-y-2"><span className="text-sm font-medium text-slate-900">Description</span><textarea className="input-base min-h-[140px]" defaultValue={school.description} name="description" required /></label>
                <label className="block space-y-2"><span className="text-sm font-medium text-slate-900">Replace School Photo</span><input accept="image/jpeg,image/png" className="input-base pt-3" name="photo" type="file" /></label>
                <button className="btn-primary" type="submit">Save Changes</button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
