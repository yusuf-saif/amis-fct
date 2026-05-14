import Link from "next/link";
import { AdminRole, PublishingStatus, ResourceCategory } from "@prisma/client";

import { AdminBanner } from "@/components/admin/admin-banner";
import { requireAdminUser } from "@/lib/auth";
import { getResourceStatusLabel } from "@/lib/content";
import { prisma } from "@/lib/db";

export default async function AdminResourcesPage({ searchParams }: { searchParams: Promise<{ feedback?: string }> }) {
  await requireAdminUser([AdminRole.SUPER_ADMIN, AdminRole.EDITOR]);
  const params = await searchParams;
  const resources = await prisma.resourceFile.findMany({ orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }] });

  return (
    <div className="space-y-6">
      <div className="card-admin space-y-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-[0.08em] text-brand-green-700">Resources</p>
            <h1 className="text-3xl font-semibold text-slate-950">Resources</h1>
            <p className="max-w-3xl text-sm text-slate-600">Manage downloadable circulars, calendars, and resource files for the public site.</p>
          </div>
          <Link className="btn-primary" href="/admin/resources/new">Create Resource</Link>
        </div>
        {params.feedback ? <AdminBanner title={params.feedback.replace(/-/g, " ")} tone="success" /> : null}
      </div>

      <div className="card-admin space-y-4">
        {resources.length === 0 ? (
          <AdminBanner title="No resources created yet" />
        ) : (
          <div className="space-y-4">
            {resources.map((resource) => (
              <article className="rounded-xl border border-slate-200 bg-white p-5" key={resource.id}>
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div className="space-y-2">
                    <h2 className="text-xl font-semibold text-slate-950">{resource.title}</h2>
                    <p className="text-sm text-slate-600">{resource.category.replace(/_/g, " ")} · {getResourceStatusLabel(resource.status)}</p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Link className="btn-secondary" href={`/admin/resources/${resource.id}`}>Edit</Link>
                    <form action={`/api/admin/resources/${resource.id}`} method="post"><input name="intent" type="hidden" value={resource.status === PublishingStatus.PUBLISHED ? "deactivate" : "activate"} /><button className="btn-secondary" type="submit">{resource.status === PublishingStatus.PUBLISHED ? "Deactivate" : "Activate"}</button></form>
                    <form action={`/api/admin/resources/${resource.id}`} method="post"><input name="intent" type="hidden" value="delete" /><button className="inline-flex min-h-11 items-center justify-center rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700" type="submit">Delete</button></form>
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
