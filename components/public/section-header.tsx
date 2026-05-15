import { Button } from "@/components/public/button";

export function SectionHeader({
  eyebrow,
  title,
  description,
  action,
  tone = "default",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: { label: string; href: string };
  tone?: "default" | "inverse";
}) {
  const titleClassName = tone === "inverse" ? "text-white" : "text-ink-primary";
  const descriptionClassName = tone === "inverse" ? "text-emerald-50/90" : "text-ink-secondary";
  const eyebrowClassName = tone === "inverse" ? "text-brand-gold-100" : "text-brand-green-700";

  return (
    <div className="motion-rise flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div className="max-w-3xl space-y-2">
        {eyebrow ? <p className={`text-xs font-semibold uppercase tracking-[var(--letter-spacing-caps)] ${eyebrowClassName}`}>{eyebrow}</p> : null}
        <h2 className={`text-h2 font-bold ${titleClassName}`}>{title}</h2>
        {description ? <p className={`text-base leading-relaxed md:text-lg ${descriptionClassName}`}>{description}</p> : null}
      </div>
      {action ? <Button href={action.href} size="sm" variant="ghost">{action.label}</Button> : null}
    </div>
  );
}
