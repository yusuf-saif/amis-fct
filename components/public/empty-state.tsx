import { Button } from "@/components/public/button";
import { Card } from "@/components/public/card";

export function EmptyState({ title, description, action }: { title: string; description: string; action?: { label: string; href: string } }) {
  return (
    <Card className="space-y-4 text-center" surface="page">
      <div className="mx-auto h-14 w-14 rounded-full bg-brand-green-100" />
      <div className="space-y-2">
        <h3 className="text-xl font-semibold text-ink-primary">{title}</h3>
        <p className="mx-auto max-w-xl text-sm leading-relaxed text-ink-secondary">{description}</p>
      </div>
      {action ? <Button href={action.href} size="sm">{action.label}</Button> : null}
    </Card>
  );
}
