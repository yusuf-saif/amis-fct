import Link from "next/link";

import { cx } from "@/lib/cx";
import { aboutSubNavigation } from "@/lib/public-content";

export function AboutSubnav({ pathname }: { pathname: string }) {
  return (
    <div className="public-container py-6">
      <nav aria-label="About section navigation" className="flex flex-wrap gap-3">
        {aboutSubNavigation.map((item) => {
          const active = pathname === item.href;

          return (
            <Link
              aria-current={active ? "page" : undefined}
              className={cx(
                "inline-flex min-h-11 items-center rounded-full border px-4 py-2 text-sm font-medium transition",
                active
                  ? "border-brand-green-200 bg-brand-green-50 text-brand-green-700"
                  : "border-surface-line bg-surface-page text-ink-secondary hover:border-brand-green-200 hover:bg-brand-green-50 hover:text-brand-green-700",
              )}
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
