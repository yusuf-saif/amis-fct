import Image from "next/image";
import Link from "next/link";
import { PublishingStatus } from "@prisma/client";

import { EmptyState } from "@/components/public/empty-state";
import { ErrorState } from "@/components/public/error-state";
import { PageHero } from "@/components/public/page-hero";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function GalleryPage() {
  let albums: Array<{ id: string; slug: string; title: string; coverImageUrl: string; eventDate: Date; summary: string | null }> = [];
  let loadFailed = false;

  try {
    albums = await prisma.galleryAlbum.findMany({ where: { status: PublishingStatus.PUBLISHED }, orderBy: { eventDate: "desc" } });
  } catch (error) {
    loadFailed = true;
    console.error("Failed to load gallery page", error);
  }

  return (
    <main id="main-content">
      <PageHero breadcrumbItems={[{ label: "Home", href: "/" }, { label: "Gallery" }]} subtitle="Browse photo albums from AMIS FCT events, school activities, and community programmes." title="Gallery" />
      <section className="public-section pt-6">
        <div className="public-container">
          {loadFailed ? (
            <ErrorState description="Gallery content is temporarily unavailable while we reconnect public data services." title="Gallery unavailable" />
          ) : albums.length === 0 ? (
            <EmptyState description="Published albums will appear here once gallery management is used from the admin dashboard." title="No gallery albums yet" />
          ) : (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {albums.map((album) => (
                <article
                  className="group overflow-hidden rounded-xl border border-surface-line bg-surface-page shadow-public1 transition duration-150 hover:-translate-y-0.5 hover:shadow-public2 focus-within:shadow-focus"
                  key={album.id}
                >
                  <Link className="block focus-visible:outline-none" href={`/gallery/${album.slug}`} tabIndex={-1}>
                    <Image
                      alt={`${album.title} album cover`}
                      className="h-60 w-full object-cover"
                      height={720}
                      src={album.coverImageUrl}
                      unoptimized
                      width={960}
                    />
                  </Link>
                  <div className="space-y-1 p-5">
                    <h2 className="text-lg font-semibold text-ink-primary">
                      <Link className="transition duration-150 group-hover:text-brand-green-700 focus-visible:outline-none focus-visible:shadow-focus" href={`/gallery/${album.slug}`}>
                        {album.title}
                      </Link>
                    </h2>
                    <p className="text-sm text-ink-secondary">
                      {album.eventDate.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
