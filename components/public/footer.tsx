import Link from "next/link";

import { footerColumns } from "@/lib/public-content";

export function Footer() {
  return (
    <footer className="border-t border-surface-line bg-brand-green-900 text-emerald-50" role="contentinfo">
      <div className="public-container space-y-12 py-12 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1.4fr] lg:gap-16">
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 font-bold text-brand-gold-100">AM</div>
              <div>
                <p className="text-lg font-semibold text-white">Association of Model Islamic Schools, FCT</p>
                <p className="text-sm text-emerald-100/80">The institutional community hub for Islamic education across the Federal Capital Territory.</p>
              </div>
            </div>
            <address className="space-y-2 not-italic text-sm leading-relaxed text-emerald-100/85">
              <p>AMIS FCT Secretariat, Abuja, Federal Capital Territory, Nigeria</p>
              <p>+234 (0) 800 000 0000</p>
              <p>info@amisfct.org</p>
            </address>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {footerColumns.map((column) => (
              <div className="space-y-4" key={column.heading}>
                <h3 className="text-sm font-semibold uppercase tracking-[var(--letter-spacing-caps)] text-brand-gold-100">{column.heading}</h3>
                <ul className="space-y-3 text-sm text-emerald-100/85">
                  {column.links.map((link) => (
                    <li key={`${column.heading}-${link.label}`}>
                      <Link className="transition hover:text-white" href={link.href}>{link.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-emerald-100/75 md:flex-row md:items-center md:justify-between">
          <p>© 2026 Association of Model Islamic Schools, FCT. All rights reserved.</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/about/governance">Privacy Policy</Link>
            <Link href="/about/governance">Cookie Policy</Link>
            <span>Facebook</span>
            <span>WhatsApp</span>
            <span>Twitter/X</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
