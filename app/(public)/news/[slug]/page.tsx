import Image from "next/image";
import { notFound } from "next/navigation";
import { PublishingStatus } from "@prisma/client";

import { PageHero } from "@/components/public/page-hero";
import { RichTextContent } from "@/components/public/rich-text-content";
import { Button } from "@/components/public/button";
import { Card } from "@/components/public/card";
import { prisma } from "@/lib/db";

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await prisma.newsPost.findFirst({ where: { slug, status: PublishingStatus.PUBLISHED } });
  if (!post) notFound();

  return (
    <main id="main-content">
      <PageHero breadcrumbItems={[{ label: "Home", href: "/" }, { label: "News", href: "/news" }, { label: post.title }]} subtitle={post.category.replace(/_/g, " ")} title={post.title} />
      <section className="public-section pt-6">
        <div className="public-container space-y-8">
          <div className="public-reading-column space-y-6">
            {post.featuredImageUrl ? <Image alt={`${post.title} featured image`} className="h-auto w-full rounded-2xl object-cover" height={720} src={post.featuredImageUrl} unoptimized width={1200} /> : null}
            <Card className="space-y-5" surface="page">
              <p className="text-sm text-ink-muted">{post.publishedAt?.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</p>
              <RichTextContent content={post.body} />
              {post.attachmentUrl ? <a className="public-link" href={post.attachmentUrl}>Download attachment</a> : null}
            </Card>
            <Button href="/news" size="sm" variant="ghost">Back to News</Button>
          </div>
        </div>
      </section>
    </main>
  );
}
