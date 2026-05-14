import Image from "next/image";
import Link from "next/link";
import { PublishingStatus } from "@prisma/client";

import { EmptyState } from "@/components/public/empty-state";
import { PageHero } from "@/components/public/page-hero";
import { Button } from "@/components/public/button";
import { Card } from "@/components/public/card";
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
                  <Card className="space-y-5" key={post.id} surface="page">
                    {post.featuredImageUrl ? <Image alt={`${post.title} featured image`} className="h-52 w-full rounded-xl object-cover" height={480} src={post.featuredImageUrl} unoptimized width={720} /> : <div aria-hidden="true" className="public-photo-panel h-52 w-full rounded-xl" />}
                    <div className="space-y-3">
                      <p className="text-xs font-semibold uppercase tracking-[0.08em] text-brand-green-700">{post.category.replace(/_/g, " ")}</p>
                      <h2 className="text-xl font-semibold text-ink-primary"><Link className="hover:text-brand-green-700" href={`/news/${post.slug}`}>{post.title}</Link></h2>
                      <p className="text-sm text-ink-muted">{post.publishedAt?.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</p>
                      <p className="text-sm leading-relaxed text-ink-secondary">{post.excerpt}</p>
                    </div>
                    <Button href={`/news/${post.slug}`} size="sm">Read Article</Button>
                  </Card>
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
