import { cx } from "@/lib/cx";

export function Card({ children, className, surface = "card" }: { children: React.ReactNode; className?: string; surface?: "card" | "page" | "green" }) {
  const surfaces = {
    card: "bg-surface-card border-surface-line",
    page: "bg-surface-page border-surface-line",
    green: "bg-brand-green-50 border-brand-green-100",
  };

  return <div className={cx("rounded-xl border p-5 shadow-public1 md:p-6", surfaces[surface], className)}>{children}</div>;
}
