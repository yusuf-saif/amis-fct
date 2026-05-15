import Image from "next/image";
import Link from "next/link";
import { PublishingStatus } from "@prisma/client";

import { EmptyState } from "@/components/public/empty-state";
import { PageHero } from "@/components/public/page-hero";
import { Button } from "@/components/public/button";
import { NEWS_PAGE_SIZE } from "@/lib/content";
import { prisma } from "@/lib/db";
import { paginationQuerySchema } from "@/lib/validation/content";

export default async function NewsPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const params = await searchParams;
  const parsed = paginationQuerySchema.safeParse(params);
  const page = parsed.success && parsed.data.page ? parsed.data.page : 1;
  const skip = (page - 1) * NEWS_PAGE_SIZE;

  const [posts, total] = await Promise.all([
    prisma.newsPost.findMany({
      where: { status: PublishingStatus.PUBLISHED },
      orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
      skip,
      take: NEWS_PAGE_SIZE,
    }),
    prisma.newsPost.count({ where: { status: PublishingStatus.PUBLISHED } }),
  ]);

  const totalPages = Math.max(1, Math.ceil(total / NEWS_PAGE_SIZE));

  return (
    <main id="main-content">
      <PageHero breadcrumbItems={[{ label: "Home", href: "/" }, { label: "News" }]} subtitle="Official circulars, achievements, and public news from the AMIS FCT network." title="News & Announcements" />
      <section className="public-section pt-6">
        <div className="public-container space-y-8">
          {posts.length === 0 ? (
            <EmptyState description="Published news articles will appear here once they are made public from the admin dashboard." title="No news available yet" />
          ) : (
            <>
              <div className="public-grid-cards">
                {posts.map((post) => (
                  <article
                    className="group flex flex-col overflow-hidden rounded-xl border border-surface-line bg-surface-page shadow-public1 transition duration-150 hover:-translate-y-0.5 hover:shadow-public2 focus-within:shadow-focus"
                    key={post.id}
                  >
                    <Link className="block focus-visible:outline-none" href={`/news/${post.slug}`} tabIndex={-1}>
                      {post.featuredImageUrl ? (
                        <Image alt={`${post.title} featured image`} className="h-52 w-full object-cover" height={480} src={post.featuredImageUrl} unoptimized width={720} />
                      ) : (
                        <div aria-hidden="true" className="public-photo-panel h-52 w-full rounded-none" />
                      )}
                    </Link>
                    <div className="flex flex-1 flex-col gap-3 p-5">
                      <p className="text-xs font-semibold uppercase tracking-[0.08em] text-brand-green-700">{post.category.replace(/_/g, " ")}</p>
                      <h2 className="text-base font-semibold text-ink-primary">
                        <Link className="transition duration-150 group-hover:text-brand-green-700 focus-visible:outline-none focus-visible:shadow-focus" href={`/news/${post.slug}`}>
                          {post.title}
                        </Link>
                      </h2>
                      <p className="text-sm text-ink-muted">{post.publishedAt?.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</p>
                      <p className="line-clamp-3 text-sm leading-relaxed text-ink-secondary">{post.excerpt}</p>
                      <Link
                        className="mt-auto text-sm font-medium text-brand-green-700 transition duration-150 hover:text-brand-green-800 hover:underline focus-visible:outline-none focus-visible:shadow-focus"
                        href={`/news/${post.slug}`}
                      >
                        Read article →
                      </Link>
                    </div>
                  </article>
                ))}
              </div>

              {totalPages > 1 ? (
                <div className="flex items-center justify-between gap-4 border-t border-surface-line pt-6">
                  <Button disabled={page <= 1} href={page > 1 ? `/news?page=${page - 1}` : undefined} size="sm" variant="secondary">Previous</Button>
                  <p className="text-sm text-ink-secondary">Page {page} of {totalPages}</p>
                  <Button disabled={page >= totalPages} href={page < totalPages ? `/news?page=${page + 1}` : undefined} size="sm" variant="secondary">Next</Button>
                </div>
              ) : null}
            </>
          )}
        </div>
      </section>
    </main>
  );
}
