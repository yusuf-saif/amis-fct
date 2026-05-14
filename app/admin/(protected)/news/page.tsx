import Link from "next/link";
import { AdminRole, NewsPost, Prisma, PublishingStatus } from "@prisma/client";

import { AdminBanner } from "@/components/admin/admin-banner";
import { requireAdminUser } from "@/lib/auth";
import { getNewsStatusLabel } from "@/lib/content";
import { prisma } from "@/lib/db";

function startOfDay(date: string) {
  const value = new Date(`${date}T00:00:00.000Z`);
  return value;
}

function endOfDay(date: string) {
  const value = new Date(`${date}T23:59:59.999Z`);
  return value;
}

export default async function AdminNewsPage({ searchParams }: { searchParams: Promise<{ search?: string; date?: string; feedback?: string }> }) {
  await requireAdminUser([AdminRole.SUPER_ADMIN, AdminRole.EDITOR]);

  const params = await searchParams;
  const search = typeof params.search === "string" ? params.search.trim() : undefined;
  const date = typeof params.date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(params.date) ? params.date : undefined;

  const where: Prisma.NewsPostWhereInput = {
    ...(search ? { title: { contains: search, mode: "insensitive" } } : {}),
    ...(date ? { publishedAt: { gte: startOfDay(date), lte: endOfDay(date) } } : {}),
  };

  const posts = await prisma.newsPost.findMany({
    where,
    orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
  });

  return (
    <div className="space-y-6">
      <div className="card-admin space-y-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-[0.08em] text-brand-green-700">News</p>
            <h1 className="text-3xl font-semibold text-slate-950">News articles</h1>
            <p className="max-w-3xl text-sm text-slate-600">Create, publish, update, and remove news content for the public AMIS FCT site.</p>
          </div>
          <Link className="btn-primary" href="/admin/news/new">Create News Article</Link>
        </div>

        {params.feedback ? <AdminBanner title={params.feedback.replace(/-/g, " ")} tone="success" /> : null}
      </div>

      <div className="card-admin space-y-4">
        <form className="grid gap-4 md:grid-cols-[minmax(0,1fr)_220px_auto] md:items-end" method="get">
          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-900">Search by title</span>
            <input className="input-base" defaultValue={search ?? ""} name="search" placeholder="Search news articles" type="search" />
          </label>
          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-900">Publish date</span>
            <input className="input-base" defaultValue={date ?? ""} name="date" type="date" />
          </label>
          <button className="btn-primary" type="submit">Apply</button>
        </form>

        {posts.length === 0 ? (
          <AdminBanner description="Try clearing the search or date filter." title="No news articles found" />
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <article className="rounded-xl border border-slate-200 bg-white p-5" key={post.id}>
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div className="space-y-2">
                    <h2 className="text-xl font-semibold text-slate-950">{post.title}</h2>
                    <p className="text-sm text-slate-600">
                      {getNewsStatusLabel(post.status)}
                      {post.publishedAt ? ` · ${post.publishedAt.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}` : " · Unpublished"}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <Link className="btn-secondary" href={`/admin/news/${post.id}`}>Edit</Link>

                    <form action={`/api/admin/news/${post.id}`} method="post">
                      <input name="intent" type="hidden" value={post.status === PublishingStatus.PUBLISHED ? "draft" : "publish"} />
                      <button className="btn-secondary" type="submit">{post.status === PublishingStatus.PUBLISHED ? "Move to Draft" : "Publish"}</button>
                    </form>

                    <form action={`/api/admin/news/${post.id}`} method="post">
                      <input name="intent" type="hidden" value="delete" />
                      <button className="inline-flex min-h-11 items-center justify-center rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700" type="submit">Delete</button>
                    </form>
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
