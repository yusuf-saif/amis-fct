import { Badge } from "@/components/public/badge";
import { Card } from "@/components/public/card";
import { EmptyState } from "@/components/public/empty-state";
import { AboutSubnav } from "@/components/public/about-subnav";
import { PageHero } from "@/components/public/page-hero";

export default function GovernancePage() {
  return (
    <main id="main-content">
      <PageHero breadcrumbItems={[{ label: "Home", href: "/" }, { label: "About", href: "/about" }, { label: "Governance" }]} subtitle="Governance transparency strengthens institutional credibility. This section provides a clear overview of structure, stewardship, and official documents." title="Governance" />
      <AboutSubnav pathname="/about/governance" />

      <section className="public-section pt-4">
        <div className="public-container grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <Card className="space-y-4" surface="page">
            <Badge tone="gold">Structure</Badge>
            <h2 className="text-2xl font-semibold text-ink-primary">Institutional stewardship</h2>
            <p className="text-sm leading-relaxed text-ink-secondary">
              AMIS FCT operates through an executive council supported by programme, communications, and administrative functions. Strategic direction, formal communication, and membership accountability are designed to be visible and consistent.
            </p>
            <div className="space-y-3 rounded-xl border border-surface-line bg-surface-card p-4 text-sm text-ink-secondary">
              <p>Executive Chairman</p>
              <p>Secretary General</p>
              <p>Programme and Quality Assurance Leads</p>
              <p>Treasury and Records Administration</p>
            </div>
          </Card>

          <div className="space-y-6">
            <Card className="space-y-4" surface="page">
              <h2 className="text-2xl font-semibold text-ink-primary">Official Downloads</h2>
              <EmptyState description="Official governance documents will be published here once they are approved for public release." title="No governance documents published" />
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}
