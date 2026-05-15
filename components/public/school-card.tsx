import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/public/badge";
import { cx } from "@/lib/cx";

type SchoolCardProps = {
  name: string;
  slug: string;
  areaCouncil: string;
  level: string;
  phone: string;
  photoUrl?: string | null;
  isActiveMember?: boolean;
};

export function SchoolCard({ name, slug, areaCouncil, level, phone, photoUrl, isActiveMember }: SchoolCardProps) {
  return (
    <article className={cx(
      "group flex flex-col overflow-hidden rounded-xl border border-surface-line bg-surface-page shadow-public1",
      "transition duration-150 hover:-translate-y-0.5 hover:shadow-public2 focus-within:shadow-focus",
    )}>
      <Link
        aria-label={`View profile for ${name}`}
        className="block focus-visible:outline-none"
        href={`/schools/${slug}`}
        tabIndex={-1}
      >
        {photoUrl ? (
          <Image
            alt={`${name} school building`}
            className="h-44 w-full object-cover"
            height={352}
            src={photoUrl}
            unoptimized
            width={560}
          />
        ) : (
          <div
            aria-hidden="true"
            className="public-photo-panel h-44 w-full rounded-none"
          />
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="space-y-1">
          <div className="flex flex-wrap items-start gap-2">
            <Link
              className="text-base font-semibold text-ink-primary transition duration-150 group-hover:text-brand-green-700 focus-visible:shadow-focus focus-visible:outline-none"
              href={`/schools/${slug}`}
            >
              {name}
            </Link>
            {isActiveMember ? <Badge tone="gold">Active Member</Badge> : null}
          </div>
          <p className="text-sm text-ink-secondary">{areaCouncil}</p>
          <p className="text-xs font-medium uppercase tracking-wide text-brand-green-700">{level}</p>
        </div>

        <a
          aria-label={`Call ${name}: ${phone}`}
          className="mt-auto text-sm font-medium text-brand-green-700 transition hover:text-brand-green-800 hover:underline focus-visible:shadow-focus focus-visible:outline-none"
          href={`tel:${phone}`}
        >
          {phone}
        </a>
      </div>
    </article>
  );
}
