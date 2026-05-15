import Link from "next/link";
import { AdminRole, PublishingStatus } from "@prisma/client";

import { AdminBanner } from "@/components/admin/admin-banner";
import { requireAdminUser } from "@/lib/auth";
import { prisma } from "@/lib/db";

export default async function AdminGalleryPage({ searchParams }: { searchParams: Promise<{ feedback?: string }> }) {
  await requireAdminUser([AdminRole.SUPER_ADMIN, AdminRole.EDITOR]);
  const params = await searchParams;
  const albums = await prisma.galleryAlbum.findMany({ orderBy: { eventDate: "desc" } });

  return (
    <div className="space-y-6">
      <div className="card-admin space-y-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-[0.08em] text-brand-green-700">Gallery</p>
            <h1 className="text-3xl font-semibold text-slate-950">Gallery albums</h1>
            <p className="max-w-3xl text-sm text-slate-600">Create public albums, update cover photos, and manage event image collections.</p>
          </div>
          <Link className="btn-primary" href="/admin/gallery/new">Create Album</Link>
        </div>
        {params.feedback ? <AdminBanner title={params.feedback.replace(/-/g, " ")} tone="success" /> : null}
      </div>

      <div className="card-admin space-y-4">
        {albums.length === 0 ? (
          <AdminBanner title="No albums created yet" />
        ) : (
          <div className="space-y-4">
            {albums.map((album) => (
              <article className="rounded-xl border border-slate-200 bg-white p-5" key={album.id}>
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div className="space-y-2">
                    <h2 className="text-xl font-semibold text-slate-950">{album.title}</h2>
                    <p className="text-sm text-slate-600">{album.status === PublishingStatus.PUBLISHED ? "Published" : "Draft"} · {album.eventDate.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Link className="btn-secondary" href={`/admin/gallery/${album.id}`}>Edit</Link>
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
