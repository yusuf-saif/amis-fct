import Image from "next/image";
import { Badge } from "@/components/public/badge";
import { Button } from "@/components/public/button";
import { Card } from "@/components/public/card";

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
    <Card className="space-y-5" surface="page">
      {photoUrl ? (
        <Image alt={`${name} school building`} className="h-48 w-full rounded-xl object-cover" height={384} src={photoUrl} unoptimized width={640} />
      ) : (
        <div aria-hidden="true" className="public-photo-panel h-48 w-full rounded-xl" />
      )}

      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="text-xl font-semibold text-ink-primary">{name}</h2>
          {isActiveMember ? <Badge tone="gold">Active Member</Badge> : null}
        </div>
        <p className="text-sm text-ink-secondary">{areaCouncil}</p>
        <p className="text-sm font-medium text-brand-green-700">{level}</p>
        <a aria-label={`Call ${name}: ${phone}`} className="public-link text-sm" href={`tel:${phone}`}>
          {phone}
        </a>
      </div>

      <Button href={`/schools/${slug}`} size="sm">View Profile</Button>
    </Card>
  );
}
