import { Button } from "@/components/public/button";

export function SectionHeader({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: { label: string; href: string };
}) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div className="max-w-3xl space-y-2">
        {eyebrow ? <p className="text-xs font-semibold uppercase tracking-[var(--letter-spacing-caps)] text-brand-green-700">{eyebrow}</p> : null}
        <h2 className="text-h2 font-bold text-ink-primary">{title}</h2>
        {description ? <p className="text-base leading-relaxed text-ink-secondary md:text-lg">{description}</p> : null}
      </div>
      {action ? <Button href={action.href} size="sm" variant="ghost">{action.label}</Button> : null}
    </div>
  );
}
