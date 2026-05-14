import { Badge } from "@/components/public/badge";
import { Button } from "@/components/public/button";
import { Card } from "@/components/public/card";
import { AboutSubnav } from "@/components/public/about-subnav";
import { PageHero } from "@/components/public/page-hero";

export default function MembershipPage() {
  return (
    <main id="main-content">
      <PageHero breadcrumbItems={[{ label: "Home", href: "/" }, { label: "About", href: "/about" }, { label: "Membership" }]} subtitle="Understand who membership is for, what it offers, and how approved schools become part of the AMIS FCT network." title="Membership" />
      <AboutSubnav pathname="/about/membership" />

      <section className="public-section pt-4">
        <div className="public-container grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <Card className="space-y-4" surface="page">
            <Badge tone="gold">Eligibility</Badge>
            <h2 className="text-2xl font-semibold text-ink-primary">Who membership is for</h2>
            <p className="text-sm leading-relaxed text-ink-secondary">Membership is intended for schools seeking to operate within a shared framework of educational quality, responsible leadership, and values-led public identity.</p>
            <ul className="space-y-3 text-sm leading-relaxed text-ink-secondary">
              <li>Schools offering recognised academic and Islamic education programmes</li>
              <li>Leadership willing to participate in official communication and association reviews</li>
              <li>Institutions prepared to maintain accurate public records and membership accountability</li>
            </ul>
          </Card>

          <div className="space-y-6">
            <Card className="space-y-4" surface="green">
              <h2 className="text-2xl font-semibold text-ink-primary">Membership benefits</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {[
                  "Institutional visibility through the association's official directory and public channels",
                  "Access to circulars, governance documents, and coordinated programme communication",
                  "Participation in teacher development, meetings, and student-facing association activities",
                  "A stronger collective voice in public-facing educational engagement across the FCT",
                ].map((item) => (
                  <div className="rounded-xl border border-brand-green-100 bg-surface-page p-4 text-sm leading-relaxed text-ink-secondary" key={item}>
                    {item}
                  </div>
                ))}
              </div>
            </Card>

            <Card className="space-y-4" surface="page">
              <h2 className="text-2xl font-semibold text-ink-primary">Application path</h2>
              <ol className="space-y-3 text-sm leading-relaxed text-ink-secondary">
                <li>1. Submit your school details through the membership registration form.</li>
                <li>2. The secretariat reviews the application and may request clarification.</li>
                <li>3. Approved schools are added to the public directory and internal records.</li>
              </ol>
              <Button href="/register" size="md">Register Your School</Button>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}
