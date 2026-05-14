export function SectionPlaceholder({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="card-admin space-y-4">
      <div className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-[0.08em] text-brand-green-700">Phase 1 placeholder</p>
        <h1 className="text-3xl font-semibold text-slate-950">{title}</h1>
      </div>
      <p className="max-w-3xl text-sm text-slate-600">{description}</p>
      <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-5 text-sm text-slate-600">
        This section is intentionally scaffolded only. Full workflows and public rendering for this entity arrive in later phases.
      </div>
    </div>
  );
}
