import Link from "next/link";
import { PublishingStatus } from "@prisma/client";

import { Badge } from "@/components/public/badge";
import { Button } from "@/components/public/button";
import { Card } from "@/components/public/card";
import { EmptyState } from "@/components/public/empty-state";
import { FormField } from "@/components/public/form-field";
import { SectionHeader } from "@/components/public/section-header";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  let latestNews: Array<{ slug: string; category: string; title: string; publishedAt: Date | null; excerpt: string }> = [];
  let upcomingEvents: Array<{ slug: string; eventType: string; title: string; startAt: Date; location: string }> = [];

  try {
    [latestNews, upcomingEvents] = await Promise.all([
      prisma.newsPost.findMany({ where: { status: PublishingStatus.PUBLISHED }, orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }], take: 3 }),
      prisma.event.findMany({ where: { status: PublishingStatus.PUBLISHED }, orderBy: { startAt: "asc" }, take: 3 }),
    ]);
  } catch (error) {
    console.error("Failed to load homepage public content", error);
  }

  const newsItems = latestNews.map((post) => ({ slug: post.slug, category: post.category.replace(/_/g, " "), title: post.title, date: post.publishedAt?.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) ?? "Unpublished", excerpt: post.excerpt }));
  const eventItems = upcomingEvents.map((event) => ({ slug: event.slug, type: event.eventType.replace(/_/g, " "), title: event.title, date: event.startAt.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }), location: event.location }));

  return (
    <main id="main-content">
      <section className="bg-surface-page">
        <div className="public-container py-8 md:py-10 lg:py-12">
          <div className="pattern-islamic surface-sheen motion-rise relative overflow-hidden rounded-[var(--radius-3xl)] border border-brand-green-100 bg-gradient-to-br from-brand-green-900 via-brand-green-800 to-brand-green-900 px-6 py-8 text-white shadow-public3 md:px-10 md:py-12 lg:grid lg:grid-cols-[1.15fr_0.85fr] lg:gap-10 lg:px-12 lg:py-16">
            <div className="hero-orb hero-orb-green motion-glow -left-4 top-10 h-28 w-28" />
            <div className="hero-orb hero-orb-gold motion-float right-8 top-16 h-24 w-24" />
            <div className="hero-orb hero-orb-green motion-float bottom-8 right-24 h-36 w-36" />
            <div className="space-y-6">
              <p className="motion-rise font-arabic text-2xl text-brand-gold-100 md:text-3xl" dir="rtl" lang="ar">
                بسم الله الرحمن الرحيم
              </p>
              <div className="space-y-4">
                <p className="motion-rise motion-rise-delay-1 text-xs font-semibold uppercase tracking-[var(--letter-spacing-caps)] text-brand-gold-100">Association of Model Islamic Schools, FCT</p>
                <h1 className="motion-rise motion-rise-delay-1 max-w-3xl text-hero font-bold text-white">The official body for model Islamic schools across the Federal Capital Territory.</h1>
                <p className="motion-rise motion-rise-delay-2 max-w-2xl text-lead leading-relaxed text-emerald-50/90">
                  Connecting member schools, strengthening educational standards, and giving families, educators, and public stakeholders a dignified home for trusted information.
                </p>
              </div>
              <div className="motion-rise motion-rise-delay-3 flex flex-col gap-3 sm:flex-row">
                <Button href="/schools" size="lg">Find a School</Button>
                <Button className="border-brand-gold-200 text-brand-gold-100 hover:bg-white/5 hover:text-white" href="/news" size="lg" variant="secondary">
                  Latest News
                </Button>
              </div>
              <div className="motion-rise motion-rise-delay-3 grid gap-3 sm:grid-cols-3">
                {[
                  { label: "Area councils", value: "6" },
                  { label: "Public resources", value: "News, events, schools" },
                  { label: "Open registration", value: "Member schools" },
                ].map((item, index) => (
                  <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-4 backdrop-blur-sm motion-float" key={item.label} style={{ animationDelay: `${index * 0.5}s` }}>
                    <p className="text-xs uppercase tracking-[var(--letter-spacing-caps)] text-emerald-50/75">{item.label}</p>
                    <p className="mt-2 text-sm font-semibold text-white">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 lg:mt-0">
              <div aria-label="Students and school community gathered for AMIS FCT activity" className="public-photo-panel motion-float aspect-[4/5] w-full" role="img">
                <div className="absolute inset-0 flex flex-col justify-end gap-3 p-6 text-white">
                  <Badge tone="gold">6 Area Councils</Badge>
                  <p className="max-w-xs text-xl font-semibold leading-tight">A warm and credible digital home for families, schools, and educational leaders.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="public-section">
        <div className="public-container">
          <Card className="max-w-4xl space-y-5 surface-sheen" surface="page">
            <SectionHeader
              eyebrow="About AMIS FCT"
              title="A trusted association serving Islamic education with dignity and clarity"
              description="AMIS FCT convenes member schools, supports school leaders, and provides a shared institutional voice for Islamic education across Abuja and the wider FCT. The association exists to strengthen quality, visibility, and official communication for schools and families alike."
            />
            <Button href="/about" size="sm" variant="ghost">Learn More about AMIS FCT</Button>
          </Card>
        </div>
      </section>

      <section className="bg-surface-card public-section" id="latest-news">
        <div className="public-container space-y-8">
          <SectionHeader action={{ href: "/news", label: "All News" }} title="Latest News" />
          {newsItems.length === 0 ? (
            <EmptyState description="Official news and announcements will appear here once they are published." title="No news published yet" />
          ) : (
            <div className="public-grid-cards">
              {newsItems.map((item, index) => (
                <article
                  className="motion-rise group flex flex-col overflow-hidden rounded-xl border border-surface-line bg-surface-page shadow-public1 transition duration-150 hover:-translate-y-0.5 hover:shadow-public2"
                  key={item.slug}
                  style={{ animationDelay: `${index * 90}ms` }}
                >
                  <Link className="block focus-visible:outline-none" href={`/news/${item.slug}`} tabIndex={-1}>
                    <div aria-hidden="true" className="public-photo-panel aspect-[3/2] rounded-none" />
                  </Link>
                  <div className="flex flex-1 flex-col gap-3 p-5">
                    <Badge>{item.category}</Badge>
                    <h3 className="text-base font-semibold text-ink-primary">
                      <Link className="transition duration-150 group-hover:text-brand-green-700 focus-visible:outline-none focus-visible:shadow-focus" href={`/news/${item.slug}`}>
                        {item.title}
                      </Link>
                    </h3>
                    <p className="text-sm text-ink-muted">{item.date}</p>
                    <p className="line-clamp-3 text-sm leading-relaxed text-ink-secondary">{item.excerpt}</p>
                    <Link
                      className="mt-auto text-sm font-medium text-brand-green-700 transition duration-150 hover:text-brand-green-800 hover:underline focus-visible:outline-none focus-visible:shadow-focus"
                      href={`/news/${item.slug}`}
                    >
                      Read more →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="public-section" id="upcoming-events">
        <div className="public-container space-y-8">
          <SectionHeader action={{ href: "/events", label: "All Events" }} title="Upcoming Events" />
          {eventItems.length === 0 ? (
            <EmptyState description="Upcoming meetings, programmes, and activities will appear here once they are published." title="No upcoming events yet" />
          ) : (
            <div className="public-grid-cards">
              {eventItems.map((item, index) => (
                <article
                  className="motion-rise group flex flex-col gap-4 rounded-xl border border-surface-line bg-surface-page p-5 shadow-public1 transition duration-150 hover:-translate-y-0.5 hover:shadow-public2"
                  key={item.slug}
                  style={{ animationDelay: `${index * 90}ms` }}
                >
                  <Badge tone="gold">{item.type}</Badge>
                  <div className="flex flex-1 flex-col gap-2">
                    <h3 className="text-base font-semibold text-ink-primary">
                      <Link className="transition duration-150 group-hover:text-brand-green-700 focus-visible:outline-none focus-visible:shadow-focus" href={`/events/${item.slug}`}>
                        {item.title}
                      </Link>
                    </h3>
                    <p className="text-sm font-medium text-brand-green-700">{item.date}</p>
                    <p className="text-sm text-ink-secondary">{item.location}</p>
                  </div>
                  <Link
                    className="text-sm font-medium text-brand-green-700 transition duration-150 hover:text-brand-green-800 hover:underline focus-visible:outline-none focus-visible:shadow-focus"
                    href={`/events/${item.slug}`}
                  >
                    View event →
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="bg-brand-green-50 public-section" id="schools-preview">
        <div className="public-container">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="space-y-5">
              <SectionHeader
                eyebrow="Member Schools"
                title="Find a member school across all six FCT Area Councils"
                description="The full searchable directory will connect families with approved member schools, show school levels clearly, and support trusted discovery across the territory."
              />
              <div className="flex flex-wrap items-center gap-4 text-sm text-ink-secondary">
                <span>Primary, secondary, and combined member institutions</span>
              </div>
              <Button href="/schools" size="md">Browse All Schools</Button>
            </div>
            <Card className="space-y-4 surface-sheen" surface="page">
              <label className="space-y-2">
                <span className="text-sm font-medium text-ink-primary">Search member schools</span>
                <input className="input-base" placeholder="Search by school name" type="search" />
              </label>
              <p className="text-sm leading-relaxed text-ink-muted">Browse the full directory to search approved member schools and view their profiles.</p>
            </Card>
          </div>
        </div>
      </section>

      <section className="bg-surface-card public-section" id="gallery-preview">
        <div className="public-container space-y-8">
          <SectionHeader action={{ href: "/gallery", label: "View Gallery" }} title="Gallery" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div className="public-photo-panel motion-rise aspect-[4/5]" key={index} style={{ animationDelay: `${index * 100}ms` }}>
                <div className="absolute inset-0 flex items-end p-4 text-sm font-medium text-white">Community moments</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-green-900 text-white public-section">
        <div className="public-container">
          <div className="pattern-islamic surface-sheen motion-rise rounded-[var(--radius-3xl)] border border-white/10 bg-white/5 px-6 py-8 md:px-8 md:py-10 lg:px-12 lg:py-12">
            <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-start">
              <div className="space-y-4">
                <SectionHeader
                  eyebrow="Newsletter"
                  title="Stay updated"
                  description="Get official circulars, events, and public updates directly in your inbox."
                  tone="inverse"
                />
              </div>
              <form aria-label="Newsletter signup" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <FormField id="newsletter-name" label="Full Name" placeholder="Your full name" required tone="inverse" />
                  <FormField id="newsletter-email" label="Email Address" placeholder="name@example.com" required tone="inverse" type="email" />
                </div>
                <FormField id="newsletter-consent" label="I agree to receive AMIS FCT updates and understand that my details will be handled according to the Privacy Policy." required tone="inverse" type="checkbox" />
                <Button type="submit">Subscribe</Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
