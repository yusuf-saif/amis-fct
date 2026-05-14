import { AboutSubnav } from "@/components/public/about-subnav";
import { Button } from "@/components/public/button";
import { Card } from "@/components/public/card";
import { PageHero } from "@/components/public/page-hero";

export default function AboutPage() {
  return (
    <main id="main-content">
      <PageHero
        breadcrumbItems={[{ label: "Home", href: "/" }, { label: "About" }]}
        subtitle="The official association for model Islamic schools in the Federal Capital Territory, committed to quality, coordination, and public trust."
        title="About AMIS FCT"
      />
      <AboutSubnav pathname="/about" />

      <section className="public-section pt-4">
        <div className="public-container space-y-10">
          <div className="public-reading-column public-prose">
            <section className="space-y-4">
              <h2 className="text-h2 font-bold">Our History</h2>
              <p>
                AMIS FCT emerged from a practical need: member schools required a more coherent platform for collaboration, accountability, and shared representation. Over time, the association grew into a respected convening body for school leaders, educators, and families seeking a dependable standard for Islamic education in the FCT.
              </p>
              <p>
                Today, AMIS FCT acts as both a community anchor and an institutional reference point, helping schools coordinate official communication, strengthen school identity, and engage government and public stakeholders with clarity.
              </p>
            </section>

            <section className="space-y-4 border-t border-surface-line pt-8">
              <h2 className="text-h2 font-bold">Vision & Mission</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-h4 font-semibold">Vision</h3>
                  <p>To foster a visible, credible, and values-driven network of model Islamic schools serving the Federal Capital Territory with educational excellence and moral integrity.</p>
                </div>
                <div>
                  <h3 className="text-h4 font-semibold">Mission</h3>
                  <p>To support member schools through coordination, communication, leadership development, and shared institutional standards that benefit students, families, and the wider public.</p>
                </div>
              </div>
            </section>
          </div>

          <section className="space-y-6">
            <h2 className="text-h2 font-bold text-ink-primary">Core Values</h2>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {[
                ["Trust", "We present schools and association information with care, accuracy, and institutional seriousness."],
                ["Service", "We prioritise families, educators, and member schools with practical communication and useful guidance."],
                ["Dignity", "We reflect Islamic values through restraint, clarity, and respectful public representation."],
              ].map(([title, body]) => (
                <Card className="space-y-3" key={title}>
                  <div aria-hidden="true" className="h-10 w-10 rounded-full bg-brand-green-100" />
                  <h3 className="text-xl font-semibold text-ink-primary">{title}</h3>
                  <p className="text-sm leading-relaxed text-ink-secondary">{body}</p>
                </Card>
              ))}
            </div>
          </section>

          <Card className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between" surface="green">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-ink-primary">Join AMIS FCT</h2>
              <p className="max-w-2xl text-sm leading-relaxed text-ink-secondary">Prospective member schools will be able to register through the public membership pathway in a later implementation phase.</p>
            </div>
            <Button href="/register">Register Your School</Button>
          </Card>
        </div>
      </section>
    </main>
  );
}
