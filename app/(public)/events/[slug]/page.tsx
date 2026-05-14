import { notFound } from "next/navigation";
import { PublishingStatus } from "@prisma/client";

import { Button } from "@/components/public/button";
import { Card } from "@/components/public/card";
import { PageHero } from "@/components/public/page-hero";
import { prisma } from "@/lib/db";

export default async function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = await prisma.event.findFirst({ where: { slug, status: PublishingStatus.PUBLISHED } });
  if (!event) notFound();

  return (
    <main id="main-content">
      <PageHero breadcrumbItems={[{ label: "Home", href: "/" }, { label: "Events", href: "/events" }, { label: event.title }]} subtitle={`${event.location} · ${event.eventType.replace(/_/g, " ")}`} title={event.title} />
      <section className="public-section pt-6">
        <div className="public-container">
          <div className="public-reading-column space-y-6">
            <Card className="space-y-4" surface="page">
              <p className="text-sm text-ink-muted">{event.startAt.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</p>
              <p className="text-base leading-relaxed text-ink-secondary">{event.description}</p>
              {event.registrationContact ? <p className="text-sm text-ink-secondary">Registration contact: {event.registrationContact}</p> : null}
              {event.attachmentUrl ? <a className="public-link" href={event.attachmentUrl}>Download event attachment</a> : null}
            </Card>
            <Button href="/events" size="sm" variant="ghost">Back to Events</Button>
          </div>
        </div>
      </section>
    </main>
  );
}
