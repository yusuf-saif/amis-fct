import { PublishingStatus } from "@prisma/client";

import { Card } from "@/components/public/card";
import { EmptyState } from "@/components/public/empty-state";
import { PageHero } from "@/components/public/page-hero";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function ResourcesPage() {
  const resources = await prisma.resourceFile.findMany({
    where: { status: PublishingStatus.PUBLISHED },
    orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
  });

  return (
    <main id="main-content">
      <PageHero breadcrumbItems={[{ label: "Home", href: "/" }, { label: "Resources" }]} subtitle="Download active circulars, calendars, guidance documents, and reference materials." title="Resources" />
      <section className="public-section pt-6">
        <div className="public-container space-y-6">
          {resources.length === 0 ? (
            <EmptyState description="Active resources will appear here when they are published from the admin dashboard." title="No resources available" />
          ) : (
            resources.map((resource) => (
              <Card className="space-y-3" key={resource.id} surface="page">
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-brand-green-700">{resource.category.replace(/_/g, " ")}</p>
                <h2 className="text-xl font-semibold text-ink-primary">{resource.title}</h2>
                {resource.description ? <p className="text-sm leading-relaxed text-ink-secondary">{resource.description}</p> : null}
                <div className="flex flex-wrap items-center gap-4 text-sm text-ink-secondary">
                  <span>{resource.fileType}</span>
                  <span>{Math.ceil(resource.fileSizeBytes / 1024)} KB</span>
                </div>
                <a className="public-link" href={resource.fileUrl}>Download Resource</a>
              </Card>
            ))
          )}
        </div>
      </section>
    </main>
  );
}
