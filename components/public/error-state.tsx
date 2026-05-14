import { Button } from "@/components/public/button";
import { Card } from "@/components/public/card";

export function ErrorState({ title, description, action }: { title: string; description: string; action?: { label: string; href: string } }) {
  return (
    <Card className="space-y-4 border-semantic-errorBorder bg-semantic-errorBg" surface="page">
      <BadgeHeader />
      <div className="space-y-2">
        <h3 className="text-xl font-semibold text-status-error">{title}</h3>
        <p className="text-sm leading-relaxed text-status-error">{description}</p>
      </div>
      {action ? <Button href={action.href} size="sm" variant="secondary">{action.label}</Button> : null}
    </Card>
  );
}

function BadgeHeader() {
  return <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-red-100 text-lg text-status-error">!</span>;
}
