import Link from "next/link";

import { cx } from "@/lib/cx";
import type { NavItem } from "@/lib/public-content";

export function DesktopNavigation({ items, pathname }: { items: NavItem[]; pathname: string }) {
  return (
    <nav aria-label="Main navigation" className="hidden items-center gap-2 md:flex">
      {items.map((item) => {
        const isActive = item.href ? pathname === item.href || pathname.startsWith(`${item.href}/`) : false;

        if (item.children?.length) {
          return (
            <details className="group relative" key={item.label} onKeyDown={(event) => {
              if (event.key === "Escape") {
                (event.currentTarget as HTMLDetailsElement).open = false;
              }
            }}>
              <summary
                className={cx(
                  "flex h-11 cursor-pointer items-center gap-2 rounded-full px-4 text-sm font-medium text-ink-secondary transition hover:bg-brand-green-50 hover:text-brand-green-800 focus-visible:shadow-focus",
                  isActive && "bg-brand-green-50 text-brand-green-700",
                )}
              >
                {item.label}
                <span aria-hidden="true" className="text-xs transition group-open:rotate-180">▾</span>
              </summary>
              <div className="absolute left-0 top-full z-[var(--z-dropdown)] mt-3 min-w-[220px] rounded-2xl border border-surface-line bg-surface-page p-2 shadow-public3">
                {item.children.map((child) => (
                  <Link aria-current={pathname === child.href ? "page" : undefined} className={cx("block rounded-xl px-4 py-3 text-sm text-ink-secondary transition hover:bg-brand-green-50 hover:text-brand-green-800 focus-visible:shadow-focus", pathname === child.href && "bg-brand-green-50 text-brand-green-700")} href={child.href} key={child.href}>
                    {child.label}
                  </Link>
                ))}
              </div>
            </details>
          );
        }

        if (item.href) {
          return (
            <Link
              aria-current={isActive ? "page" : undefined}
              className={cx(
                "flex h-11 items-center rounded-full px-4 text-sm font-medium text-ink-secondary transition hover:bg-brand-green-50 hover:text-brand-green-800 focus-visible:shadow-focus",
                isActive && "bg-brand-green-50 text-brand-green-700",
              )}
              href={item.href}
              key={item.label}
            >
              {item.label}
            </Link>
          );
        }

        return (
          <span className="flex h-11 items-center rounded-full px-4 text-sm font-medium text-ink-muted" key={item.label}>
            {item.label}
          </span>
        );
      })}
    </nav>
  );
}
