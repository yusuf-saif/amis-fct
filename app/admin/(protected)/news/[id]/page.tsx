import Image from "next/image";
import Link from "next/link";
import { AdminRole, NewsCategory, PublishingStatus } from "@prisma/client";
import { notFound } from "next/navigation";

import { AdminBanner } from "@/components/admin/admin-banner";
import { requireAdminUser } from "@/lib/auth";
import { prisma } from "@/lib/db";

function toDateTimeLocal(value: Date | null) {
  if (!value) return "";
  return new Date(value.getTime() - value.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
}

export default async function AdminNewsDetailPage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ feedback?: string }> }) {
  await requireAdminUser([AdminRole.SUPER_ADMIN, AdminRole.EDITOR]);

  const { id } = await params;
  const query = await searchParams;
  const post = await prisma.newsPost.findUnique({ where: { id } });

  if (!post) notFound();

  return (
    <div className="space-y-6">
      <div className="card-admin space-y-4">
        <Link className="text-sm font-medium text-brand-green-700" href="/admin/news">← Back to News</Link>
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.08em] text-brand-green-700">News Detail</p>
          <h1 className="text-3xl font-semibold text-slate-950">{post.title}</h1>
          <p className="text-sm text-slate-600">Status: {post.status === PublishingStatus.PUBLISHED ? "Published" : "Draft"}</p>
        </div>
        {query.feedback ? <AdminBanner title={query.feedback.replace(/-/g, " ")} tone="success" /> : null}
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
        <div className="space-y-6">
          <div className="card-admin space-y-4">
            <h2 className="text-xl font-semibold text-slate-950">Current Media</h2>
            {post.featuredImageUrl ? <Image alt={`${post.title} featured image`} className="h-72 w-full rounded-xl object-cover" height={640} src={post.featuredImageUrl} unoptimized width={960} /> : <div className="flex h-72 items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 text-sm text-slate-500">No featured image</div>}
            {post.attachmentUrl ? <a className="text-sm font-medium text-brand-green-700" href={post.attachmentUrl}>Download current attachment</a> : <p className="text-sm text-slate-500">No attachment uploaded.</p>}
          </div>
        </div>

        <div className="card-admin space-y-4">
          <h2 className="text-xl font-semibold text-slate-950">Edit Article</h2>
          <form action={`/api/admin/news/${post.id}`} className="space-y-4" encType="multipart/form-data" method="post">
            <input name="intent" type="hidden" value="update" />
            <label className="block space-y-2"><span className="text-sm font-medium text-slate-900">Title</span><input className="input-base" defaultValue={post.title} name="title" required /></label>
            <label className="block space-y-2"><span className="text-sm font-medium text-slate-900">Category</span><select className="input-base" defaultValue={post.category} name="category">{Object.values(NewsCategory).map((value) => <option key={value} value={value}>{value.replace(/_/g, " ")}</option>)}</select></label>
            <label className="block space-y-2"><span className="text-sm font-medium text-slate-900">Body</span><textarea className="input-base min-h-[220px]" defaultValue={post.body} name="body" required /></label>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="block space-y-2"><span className="text-sm font-medium text-slate-900">Status</span><select className="input-base" defaultValue={post.status} name="status"><option value={PublishingStatus.DRAFT}>Draft</option><option value={PublishingStatus.PUBLISHED}>Published</option></select></label>
              <label className="block space-y-2"><span className="text-sm font-medium text-slate-900">Publish date</span><input className="input-base" defaultValue={toDateTimeLocal(post.publishedAt)} name="publishedAt" type="datetime-local" /></label>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="block space-y-2"><span className="text-sm font-medium text-slate-900">Replace featured image</span><input accept="image/jpeg,image/png" className="input-base pt-3" name="featuredImage" type="file" /></label>
              <label className="block space-y-2"><span className="text-sm font-medium text-slate-900">Replace attachment</span><input accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,image/jpeg,image/png" className="input-base pt-3" name="attachment" type="file" /></label>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="block space-y-2"><span className="text-sm font-medium text-slate-900">Meta title</span><input className="input-base" defaultValue={post.metaTitle ?? ""} name="metaTitle" /></label>
              <label className="block space-y-2"><span className="text-sm font-medium text-slate-900">Meta description</span><input className="input-base" defaultValue={post.metaDescription ?? ""} name="metaDescription" /></label>
            </div>
            <button className="btn-primary" type="submit">Save Changes</button>
          </form>
        </div>
      </div>
    </div>
  );
}
