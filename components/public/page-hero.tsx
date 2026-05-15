import { Breadcrumbs } from "@/components/public/breadcrumbs";
import { Button } from "@/components/public/button";

export function PageHero({
  title,
  subtitle,
  breadcrumbItems,
  cta,
}: {
  title: string;
  subtitle?: string;
  breadcrumbItems?: Array<{ label: string; href?: string }>;
  cta?: { label: string; href: string };
}) {
  return (
    <section className="bg-brand-green-900 text-white">
      <div className="public-container py-12 md:py-16 lg:py-20">
        <div className="pattern-islamic surface-sheen motion-rise relative overflow-hidden rounded-[var(--radius-3xl)] border border-white/10 bg-white/5 px-6 py-8 md:px-8 lg:px-10">
          <div className="hero-orb hero-orb-green motion-glow right-10 top-10 h-24 w-24" />
          <div className="hero-orb hero-orb-gold motion-float bottom-6 right-24 h-20 w-20" />
          <div className="max-w-4xl space-y-4">
            {breadcrumbItems ? <Breadcrumbs items={breadcrumbItems} /> : null}
            <h1 className="motion-rise motion-rise-delay-1 text-h1 font-bold text-white">{title}</h1>
            {subtitle ? <p className="motion-rise motion-rise-delay-2 max-w-3xl text-lead leading-relaxed text-emerald-50/90">{subtitle}</p> : null}
            {cta ? <Button className="motion-rise motion-rise-delay-3 mt-2" href={cta.href}>{cta.label}</Button> : null}
          </div>
        </div>
      </div>
    </section>
  );
}
