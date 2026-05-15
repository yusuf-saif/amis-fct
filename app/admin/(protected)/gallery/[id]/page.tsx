import Image from "next/image";
import Link from "next/link";
import { AdminRole, PublishingStatus } from "@prisma/client";
import { notFound } from "next/navigation";

import { AdminBanner } from "@/components/admin/admin-banner";
import { requireAdminUser } from "@/lib/auth";
import { prisma } from "@/lib/db";

function toDateTimeLocal(value: Date) {
  return new Date(value.getTime() - value.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
}

export default async function AdminGalleryDetailPage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ feedback?: string }> }) {
  await requireAdminUser([AdminRole.SUPER_ADMIN, AdminRole.EDITOR]);
  const { id } = await params;
  const query = await searchParams;
  const album = await prisma.galleryAlbum.findUnique({ where: { id } });
  if (!album) notFound();
  const events = await prisma.event.findMany({ orderBy: { startAt: "desc" }, select: { id: true, title: true } });
  const photos = Array.isArray(album.photoUrls) ? (album.photoUrls as string[]) : [];

  return (
    <div className="space-y-6">
      <div className="card-admin space-y-4">
        <Link className="text-sm font-medium text-brand-green-700" href="/admin/gallery">← Back to Gallery</Link>
        <div className="space-y-2"><p className="text-sm font-semibold uppercase tracking-[0.08em] text-brand-green-700">Gallery Album</p><h1 className="text-3xl font-semibold text-slate-950">{album.title}</h1></div>
        {query.feedback ? <AdminBanner title={query.feedback.replace(/-/g, " ")} tone="success" /> : null}
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <div className="card-admin space-y-4">
          <h2 className="text-xl font-semibold text-slate-950">Current Media</h2>
          <Image alt={`${album.title} cover`} className="h-64 w-full rounded-xl object-cover" height={640} src={album.coverImageUrl} unoptimized width={960} />
          <div className="grid grid-cols-2 gap-3">
            {photos.map((photo) => <Image alt={`${album.title} photo`} className="h-32 w-full rounded-xl object-cover" height={320} key={photo} src={photo} unoptimized width={480} />)}
          </div>
        </div>

        <div className="card-admin space-y-4">
          <form action={`/api/admin/gallery/${album.id}`} className="space-y-4" encType="multipart/form-data" method="post">
            <input name="intent" type="hidden" value="update" />
            <label className="block space-y-2"><span className="text-sm font-medium text-slate-900">Title</span><input className="input-base" defaultValue={album.title} name="title" required /></label>
            <label className="block space-y-2"><span className="text-sm font-medium text-slate-900">Description</span><textarea className="input-base min-h-[180px]" defaultValue={album.summary ?? ""} name="summary" /></label>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="block space-y-2"><span className="text-sm font-medium text-slate-900">Event Date</span><input className="input-base" defaultValue={toDateTimeLocal(album.eventDate)} name="eventDate" required type="datetime-local" /></label>
              <label className="block space-y-2"><span className="text-sm font-medium text-slate-900">Linked Event</span><select className="input-base" defaultValue={album.eventId ?? ""} name="eventId"><option value="">None</option>{events.map((event) => <option key={event.id} value={event.id}>{event.title}</option>)}</select></label>
            </div>
            <label className="block space-y-2"><span className="text-sm font-medium text-slate-900">Status</span><select className="input-base" defaultValue={album.status} name="status"><option value={PublishingStatus.DRAFT}>Draft</option><option value={PublishingStatus.PUBLISHED}>Published</option></select></label>
            <label className="block space-y-2"><span className="text-sm font-medium text-slate-900">Replace Cover Photo</span><input accept="image/jpeg,image/png" className="input-base pt-3" name="coverPhoto" type="file" /></label>
            <label className="block space-y-2"><span className="text-sm font-medium text-slate-900">Replace Album Photos</span><input accept="image/jpeg,image/png" className="input-base pt-3" multiple name="photos" type="file" /></label>
            <div className="flex flex-wrap gap-3">
              <button className="btn-primary" type="submit">Save Album</button>
              <form action={`/api/admin/gallery/${album.id}`} method="post">
                <input name="intent" type="hidden" value="delete" />
                <button className="inline-flex min-h-11 items-center justify-center rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700" type="submit">Delete Album</button>
              </form>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
