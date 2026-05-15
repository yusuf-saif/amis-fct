"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/public/button";
import { cx } from "@/lib/cx";
import { mobileNavigation } from "@/lib/public-content";

export function MobileNavigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) {
      triggerRef.current?.focus();
      document.body.style.removeProperty("overflow");
      return;
    }

    closeRef.current?.focus();
    document.body.style.setProperty("overflow", "hidden");

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }

      if (event.key !== "Tab" || !drawerRef.current) {
        return;
      }

      const focusable = Array.from(
        drawerRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => !element.hasAttribute("hidden"));

      if (focusable.length === 0) {
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.removeProperty("overflow");
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        aria-controls="mobile-nav-menu"
        aria-expanded={open}
        aria-label={open ? "Close menu" : "Open menu"}
        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-surface-line bg-surface-page text-lg text-brand-green-800 transition hover:bg-brand-green-50"
        onClick={() => setOpen((value) => !value)}
        ref={triggerRef}
        type="button"
      >
        {open ? "×" : "☰"}
      </button>

      {open ? (
        <div className="fixed inset-0 z-[var(--z-modal)] bg-brand-green-900/50" onClick={() => setOpen(false)}>
          <div
            aria-label="Navigation menu"
            aria-modal="true"
            className="absolute right-0 top-0 flex h-full w-[min(100%,22rem)] flex-col gap-6 overflow-y-auto bg-surface-page px-5 py-6 shadow-public4"
            id="mobile-nav-menu"
            role="dialog"
            onClick={(event) => event.stopPropagation()}
            ref={drawerRef}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[var(--letter-spacing-caps)] text-brand-green-700">AMIS FCT</p>
                <p className="mt-1 text-sm text-ink-secondary">Public navigation</p>
              </div>
              <button aria-label="Close menu" className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-surface-line focus-visible:shadow-focus" onClick={() => setOpen(false)} ref={closeRef} type="button">
                ×
              </button>
            </div>

            <label className="space-y-2">
              <span className="text-sm font-medium text-ink-primary">Search</span>
              <input className="input-base" placeholder="Search the site" type="search" />
            </label>

            <nav className="space-y-2" role="navigation">
              {mobileNavigation.map((item) => {
                const active = item.href ? pathname === item.href || (item.href !== "/" && pathname.startsWith(`${item.href}/`)) : false;

                if (!item.href) {
                  return (
                    <span className="flex min-h-[52px] items-center rounded-xl px-4 text-base font-medium text-ink-muted" key={item.label}>
                      {item.label}
                    </span>
                  );
                }

                return (
                  <Link
                    aria-current={active ? "page" : undefined}
                    className={cx(
                      "flex min-h-[52px] items-center rounded-xl px-4 text-base font-medium transition",
                      active ? "bg-brand-green-50 text-brand-green-700" : "text-ink-secondary hover:bg-brand-green-50 hover:text-brand-green-800",
                    )}
                    href={item.href}
                    key={item.label}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="mt-auto space-y-3 border-t border-surface-line pt-5">
              <Button ariaLabel="Register your school with AMIS FCT" className="w-full" href="/register">Register Your School</Button>
              <p className="text-xs leading-relaxed text-ink-muted">Some public content sections are intentionally static in this phase while layout and design foundations are established.</p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
