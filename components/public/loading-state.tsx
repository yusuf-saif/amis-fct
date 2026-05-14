export function LoadingState({ label = "Loading content" }: { label?: string }) {
  return (
    <div aria-live="polite" className="rounded-xl border border-surface-line bg-surface-card p-6 shadow-public1">
      <div className="flex items-center gap-4">
        <div aria-hidden="true" className="h-9 w-9 animate-pulse rounded-full bg-brand-green-200" />
        <div className="space-y-2">
          <p className="text-sm font-semibold text-ink-primary">{label}</p>
          <div className="h-3 w-56 animate-pulse rounded-full bg-brand-green-100" />
        </div>
      </div>
    </div>
  );
}
