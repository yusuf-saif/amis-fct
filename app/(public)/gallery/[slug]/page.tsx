import { notFound } from "next/navigation";
import { PublishingStatus } from "@prisma/client";

import { Card } from "@/components/public/card";
import { GalleryLightbox } from "@/components/public/gallery-lightbox";
import { PageHero } from "@/components/public/page-hero";
import { prisma } from "@/lib/db";

export default async function GalleryAlbumPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const album = await prisma.galleryAlbum.findFirst({ where: { slug, status: PublishingStatus.PUBLISHED } });
  if (!album) notFound();

  const images = Array.isArray(album.photoUrls) ? (album.photoUrls as string[]) : [];

  return (
    <main id="main-content">
      <PageHero breadcrumbItems={[{ label: "Home", href: "/" }, { label: "Gallery", href: "/gallery" }, { label: album.title }]} subtitle={album.eventDate.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })} title={album.title} />
      <section className="public-section pt-6">
        <div className="public-container space-y-6">
          {album.summary ? <Card surface="page"><p className="text-base leading-relaxed text-ink-secondary">{album.summary}</p></Card> : null}
          <GalleryLightbox albumTitle={album.title} images={images} />
        </div>
      </section>
    </main>
  );
}
