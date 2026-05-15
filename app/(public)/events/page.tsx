import Link from "next/link";
import { PublishingStatus } from "@prisma/client";

import { Button } from "@/components/public/button";
import { EmptyState } from "@/components/public/empty-state";
import { PageHero } from "@/components/public/page-hero";
import { EVENTS_PAGE_SIZE } from "@/lib/content";
import { prisma } from "@/lib/db";
import { paginationQuerySchema } from "@/lib/validation/content";

export default async function EventsPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const params = await searchParams;
  const parsed = paginationQuerySchema.safeParse(params);
  const page = parsed.success && parsed.data.page ? parsed.data.page : 1;
  const skip = (page - 1) * EVENTS_PAGE_SIZE;

  const [events, total] = await Promise.all([
    prisma.event.findMany({
      where: { status: PublishingStatus.PUBLISHED },
      orderBy: { startAt: "asc" },
      skip,
      take: EVENTS_PAGE_SIZE,
    }),
    prisma.event.count({ where: { status: PublishingStatus.PUBLISHED } }),
  ]);

  const totalPages = Math.max(1, Math.ceil(total / EVENTS_PAGE_SIZE));

  return (
    <main id="main-content">
      <PageHero breadcrumbItems={[{ label: "Home", href: "/" }, { label: "Events" }]} subtitle="Upcoming meetings, workshops, student activities, and association programmes across the FCT." title="Events" />
      <section className="public-section pt-6">
        <div className="public-container space-y-8">
          {events.length === 0 ? (
            <EmptyState description="Upcoming events will appear here when they are published from the admin dashboard." title="No upcoming events" />
          ) : (
            <>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {events.map((event) => (
                  <article
                    className="group flex flex-col gap-4 rounded-xl border border-surface-line bg-surface-page p-5 shadow-public1 transition duration-150 hover:-translate-y-0.5 hover:shadow-public2 focus-within:shadow-focus"
                    key={event.id}
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.08em] text-brand-green-700">{event.eventType.replace(/_/g, " ")}</p>
                    <div className="flex flex-1 flex-col gap-2">
                      <h2 className="text-base font-semibold text-ink-primary">
                        <Link className="transition duration-150 group-hover:text-brand-green-700 focus-visible:outline-none focus-visible:shadow-focus" href={`/events/${event.slug}`}>
                          {event.title}
                        </Link>
                      </h2>
                      <p className="text-sm font-medium text-brand-green-700">{event.startAt.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</p>
                      <p className="text-sm text-ink-secondary">{event.location}</p>
                      <p className="line-clamp-3 text-sm leading-relaxed text-ink-secondary">{event.summary}</p>
                    </div>
                    <Link
                      className="text-sm font-medium text-brand-green-700 transition duration-150 hover:text-brand-green-800 hover:underline focus-visible:outline-none focus-visible:shadow-focus"
                      href={`/events/${event.slug}`}
                    >
                      View event →
                    </Link>
                  </article>
                ))}
              </div>

              {totalPages > 1 ? (
                <div className="flex items-center justify-between gap-4 border-t border-surface-line pt-6">
                  <Button disabled={page <= 1} href={page > 1 ? `/events?page=${page - 1}` : undefined} size="sm" variant="secondary">Previous</Button>
                  <p className="text-sm text-ink-secondary">Page {page} of {totalPages}</p>
                  <Button disabled={page >= totalPages} href={page < totalPages ? `/events?page=${page + 1}` : undefined} size="sm" variant="secondary">Next</Button>
                </div>
              ) : null}
            </>
          )}
        </div>
      </section>
    </main>
  );
}
