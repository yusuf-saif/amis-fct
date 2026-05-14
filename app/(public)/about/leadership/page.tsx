import { AboutSubnav } from "@/components/public/about-subnav";
import { Card } from "@/components/public/card";
import { PageHero } from "@/components/public/page-hero";
import { leadershipMembers } from "@/lib/public-content";

export default function LeadershipPage() {
  return (
    <main id="main-content">
      <PageHero breadcrumbItems={[{ label: "Home", href: "/" }, { label: "About", href: "/about" }, { label: "Leadership" }]} subtitle="Meet the executive council responsible for stewardship, coordination, and public leadership across the AMIS FCT network." title="Executive Council" />
      <AboutSubnav pathname="/about/leadership" />

      <section className="public-section pt-4">
        <div className="public-container">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {leadershipMembers.map((member) => (
              <Card className="space-y-4" key={member.name} surface="page">
                <div aria-label={`${member.name} portrait`} className="public-photo-panel aspect-[4/5]" role="img" />
                <div className="space-y-2">
                  <h2 className="text-xl font-semibold text-ink-primary">{member.name}</h2>
                  <p className="text-sm font-medium text-brand-green-700">{member.title}</p>
                  <p className="text-sm leading-relaxed text-ink-secondary">{member.bio}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
