export function AdminBanner({ tone = "info", title, description }: { tone?: "info" | "success" | "error"; title: string; description?: string }) {
  const tones = {
    info: "border-sky-200 bg-sky-50 text-sky-800",
    success: "border-emerald-200 bg-emerald-50 text-emerald-800",
    error: "border-red-200 bg-red-50 text-red-800",
  };

  return (
    <div className={`rounded-xl border px-4 py-3 text-sm ${tones[tone]}`} role="status">
      <p className="font-semibold">{title}</p>
      {description ? <p className="mt-1 leading-relaxed">{description}</p> : null}
    </div>
  );
}
