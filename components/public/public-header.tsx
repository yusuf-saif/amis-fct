import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/public/button";
import { DesktopNavigation } from "@/components/public/desktop-navigation";
import { MobileNavigation } from "@/components/public/mobile-navigation";
import { publicNavigation } from "@/lib/public-content";

export function PublicHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-[var(--z-sticky)] border-b border-surface-line/80 bg-surface-page/95 backdrop-blur-sm">
      <div className="public-container flex h-14 items-center justify-between gap-4 md:h-16">
        <Link className="flex min-w-0 items-center gap-3" href="/">
          <div aria-hidden="true" className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-green-700 text-sm font-bold text-white shadow-public1">
            AM
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-ink-primary">AMIS FCT</p>
            <p className="hidden truncate text-xs text-ink-muted sm:block">Association of Model Islamic Schools, FCT</p>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          <DesktopNavigation items={publicNavigation} pathname={pathname} />
          <Button ariaLabel="Subscribe to AMIS FCT updates" className="hidden md:inline-flex" href="/about/membership" size="sm">Subscribe</Button>
          <MobileNavigation />
        </div>
      </div>
    </header>
  );
}
