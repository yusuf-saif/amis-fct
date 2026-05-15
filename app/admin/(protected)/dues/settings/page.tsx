import { AdminRole } from "@prisma/client";

import { AdminBanner } from "@/components/admin/admin-banner";
import { requireAdminUser } from "@/lib/auth";
import { getBadgeVisibilityEnabled } from "@/lib/dues";
import { prisma } from "@/lib/db";

export default async function AdminDuesSettingsPage({ searchParams }: { searchParams: Promise<{ feedback?: string }> }) {
  await requireAdminUser([AdminRole.SUPER_ADMIN]);
  const params = await searchParams;
  const settings = await prisma.duesTierSetting.findMany({ orderBy: { academicYear: "desc" } });
  const badgeVisible = await getBadgeVisibilityEnabled();

  return (
    <div className="space-y-6">
      <div className="card-admin space-y-4">
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.08em] text-brand-green-700">Dues Settings</p>
          <h1 className="text-3xl font-semibold text-slate-950">Academic year settings</h1>
          <p className="max-w-3xl text-sm text-slate-600">Configure tier amounts per academic year and control public Active Member badge visibility.</p>
        </div>
        {params.feedback ? <AdminBanner title={params.feedback.replace(/-/g, " ")} tone="success" /> : null}
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="card-admin space-y-4">
          <h2 className="text-xl font-semibold text-slate-950">Create New Academic Year Setting</h2>
          <form action="/api/admin/dues/settings" className="space-y-4" method="post">
            <input name="intent" type="hidden" value="create" />
            <label className="block space-y-2"><span className="text-sm font-medium text-slate-900">Academic Year</span><input className="input-base" name="academicYear" placeholder="2026/2027" required /></label>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="block space-y-2"><span className="text-sm font-medium text-slate-900">Tier 1 Amount</span><input className="input-base" min="0" name="tier1Amount" required type="number" /></label>
              <label className="block space-y-2"><span className="text-sm font-medium text-slate-900">Tier 2 Amount</span><input className="input-base" min="0" name="tier2Amount" required type="number" /></label>
              <label className="block space-y-2"><span className="text-sm font-medium text-slate-900">Tier 3 Amount</span><input className="input-base" min="0" name="tier3Amount" required type="number" /></label>
              <label className="block space-y-2"><span className="text-sm font-medium text-slate-900">Tier 4 Amount</span><input className="input-base" min="0" name="tier4Amount" required type="number" /></label>
            </div>
            <button className="btn-primary" type="submit">Save Setting</button>
          </form>
        </div>

        <div className="space-y-6">
          <div className="card-admin space-y-4">
            <h2 className="text-xl font-semibold text-slate-950">Public Active Member Badge</h2>
            <p className="text-sm text-slate-600">Current status: <span className="font-semibold text-slate-950">{badgeVisible ? "Enabled" : "Disabled"}</span></p>
            <form action="/api/admin/dues/settings" method="post">
              <input name="intent" type="hidden" value="toggle_badge" />
              <input name="enabled" type="hidden" value={badgeVisible ? "false" : "true"} />
              <button className="btn-secondary" type="submit">{badgeVisible ? "Disable Badge" : "Enable Badge"}</button>
            </form>
          </div>

          <div className="card-admin space-y-4">
            <h2 className="text-xl font-semibold text-slate-950">Existing Academic Year Settings</h2>
            {settings.length === 0 ? (
              <AdminBanner title="No dues settings created yet" />
            ) : (
              <div className="space-y-4">
                {settings.map((setting) => (
                  <article className="rounded-xl border border-slate-200 bg-white p-5" key={setting.id}>
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                      <div className="space-y-2">
                        <h3 className="text-xl font-semibold text-slate-950">{setting.academicYear}</h3>
                        <p className="text-sm text-slate-600">Tier 1: ₦{setting.tier1Amount.toLocaleString()} · Tier 2: ₦{setting.tier2Amount.toLocaleString()} · Tier 3: ₦{setting.tier3Amount.toLocaleString()} · Tier 4: ₦{setting.tier4Amount.toLocaleString()}</p>
                        <p className="text-sm font-medium text-slate-700">{setting.isCurrent ? "Current academic year" : "Not current"}</p>
                      </div>
                      <div className="flex flex-wrap gap-3">
                        <form action={`/api/admin/dues/settings/${setting.id}`} className="space-y-3" method="post">
                          <input name="intent" type="hidden" value="set_current" />
                          <button className="btn-secondary" type="submit">Set Current</button>
                        </form>
                      </div>
                    </div>
                    <form action={`/api/admin/dues/settings/${setting.id}`} className="mt-4 grid gap-4 md:grid-cols-2" method="post">
                      <input name="intent" type="hidden" value="update" />
                      <input name="academicYear" type="hidden" value={setting.academicYear} />
                      <label className="block space-y-2"><span className="text-sm font-medium text-slate-900">Tier 1</span><input className="input-base" defaultValue={setting.tier1Amount} min="0" name="tier1Amount" required type="number" /></label>
                      <label className="block space-y-2"><span className="text-sm font-medium text-slate-900">Tier 2</span><input className="input-base" defaultValue={setting.tier2Amount} min="0" name="tier2Amount" required type="number" /></label>
                      <label className="block space-y-2"><span className="text-sm font-medium text-slate-900">Tier 3</span><input className="input-base" defaultValue={setting.tier3Amount} min="0" name="tier3Amount" required type="number" /></label>
                      <label className="block space-y-2"><span className="text-sm font-medium text-slate-900">Tier 4</span><input className="input-base" defaultValue={setting.tier4Amount} min="0" name="tier4Amount" required type="number" /></label>
                      <div className="md:col-span-2"><button className="btn-primary" type="submit">Update Amounts</button></div>
                    </form>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
