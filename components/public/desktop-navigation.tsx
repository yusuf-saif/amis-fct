"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cx } from "@/lib/cx";
import type { NavItem } from "@/lib/public-content";

export function DesktopNavigation({ items }: { items: NavItem[] }) {
  const pathname = usePathname();

  return (
    <nav aria-label="Main navigation" className="hidden items-center gap-1 md:flex">
      {items.map((item) => {
        const isActive = item.href ? pathname === item.href || pathname.startsWith(`${item.href}/`) : false;

        if (item.children?.length) {
          return (
            <details
              className="group relative"
              key={item.label}
              onKeyDown={(event) => {
                if (event.key === "Escape") {
                  (event.currentTarget as HTMLDetailsElement).open = false;
                }
              }}
            >
              <summary
                className={cx(
                  "flex h-11 cursor-pointer select-none items-center gap-1.5 rounded-full px-4 text-sm font-medium text-ink-secondary transition duration-150 hover:bg-brand-green-50 hover:text-brand-green-800 focus-visible:shadow-focus",
                  isActive && "bg-brand-green-50 text-brand-green-700",
                )}
              >
                {item.label}
                <svg
                  aria-hidden="true"
                  className="h-3.5 w-3.5 transition-transform duration-150 group-open:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  viewBox="0 0 24 24"
                >
                  <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </summary>
              <div className="absolute left-0 top-full z-[var(--z-dropdown)] mt-2 min-w-[210px] rounded-2xl border border-surface-line bg-surface-page p-1.5 shadow-public3">
                {item.children.map((child) => (
                  <Link
                    aria-current={pathname === child.href ? "page" : undefined}
                    className={cx(
                      "block rounded-xl px-4 py-2.5 text-sm text-ink-secondary transition duration-150 hover:bg-brand-green-50 hover:text-brand-green-800 focus-visible:shadow-focus",
                      pathname === child.href && "bg-brand-green-50 font-medium text-brand-green-700",
                    )}
                    href={child.href}
                    key={child.href}
                  >
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
                "flex h-11 items-center rounded-full px-4 text-sm font-medium text-ink-secondary transition duration-150 hover:bg-brand-green-50 hover:text-brand-green-800 focus-visible:shadow-focus",
                isActive && "bg-brand-green-50 font-medium text-brand-green-700",
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
