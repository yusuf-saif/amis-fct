import { cx } from "@/lib/cx";

export function Badge({ children, tone = "green", className }: { children: React.ReactNode; tone?: "green" | "gold" | "muted"; className?: string }) {
  const tones = {
    green: "bg-brand-green-100 text-brand-green-800 border-brand-green-200",
    gold: "bg-brand-gold-100 text-brand-gold-700 border-brand-gold-200",
    muted: "bg-surface-muted text-ink-secondary border-surface-line",
  };

  return <span className={cx("inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold tracking-[0.04em]", tones[tone], className)}>{children}</span>;
}
