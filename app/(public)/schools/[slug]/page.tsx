import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SchoolStatus } from "@prisma/client";

import { Badge } from "@/components/public/badge";
import { Button } from "@/components/public/button";
import { Card } from "@/components/public/card";
import { PageHero } from "@/components/public/page-hero";
import { prisma } from "@/lib/db";
import { getSchoolArmLabel, getSchoolLevelLabel, isSchoolActiveMember } from "@/lib/schools";

export default async function SchoolProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const school = await prisma.school.findFirst({
    where: {
      slug,
      status: SchoolStatus.APPROVED,
    },
    include: {
      duesRecords: {
        select: {
          academicYear: true,
          status: true,
        },
      },
    },
  });

  if (!school) {
    notFound();
  }

  const activeMember = isSchoolActiveMember(school.duesRecords);

  return (
    <main id="main-content">
      <PageHero
        breadcrumbItems={[{ label: "Home", href: "/" }, { label: "Schools", href: "/schools" }, { label: school.name }]}
        subtitle={`${school.areaCouncil} · ${getSchoolLevelLabel(school.level)}`}
        title={school.name}
      />

      <section className="public-section pt-6">
        <div className="public-container space-y-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.95fr]">
            <Card className="space-y-6" surface="page">
              {school.photoUrl ? (
                <Image alt={`${school.name} school building`} className="h-72 w-full rounded-xl object-cover" height={640} src={school.photoUrl} unoptimized width={960} />
              ) : (
                <div aria-hidden="true" className="public-photo-panel h-72 w-full rounded-xl" />
              )}

              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge>{getSchoolLevelLabel(school.level)}</Badge>
                  {activeMember ? <Badge tone="gold">Active Member</Badge> : null}
                </div>
                <p className="text-sm leading-relaxed text-ink-secondary">{school.description}</p>
              </div>
            </Card>

            <div className="space-y-6">
              <Card className="space-y-4" surface="page">
                <h2 className="text-2xl font-semibold text-ink-primary">School Details</h2>
                <dl className="grid gap-4 text-sm text-ink-secondary">
                  <div>
                    <dt className="font-semibold text-ink-primary">Area Council</dt>
                    <dd>{school.areaCouncil}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-ink-primary">Arms Operated</dt>
                    <dd>{school.arms.map(getSchoolArmLabel).join(", ")}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-ink-primary">Principal</dt>
                    <dd>{school.principalName}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-ink-primary">Year Established</dt>
                    <dd>{school.yearEstablished}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-ink-primary">Phone</dt>
                    <dd><a className="public-link" href={`tel:${school.phone}`}>{school.phone}</a></dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-ink-primary">Email</dt>
                    <dd><a className="public-link" href={`mailto:${school.email}`}>{school.email}</a></dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-ink-primary">Address</dt>
                    <dd>{school.address}</dd>
                  </div>
                </dl>
              </Card>

              <Card className="space-y-4" surface="green">
                <h2 className="text-2xl font-semibold text-ink-primary">Location</h2>
                <div aria-label={`Map placeholder for ${school.name}`} className="public-photo-panel h-56 w-full rounded-xl" role="img" />
                <p className="text-sm leading-relaxed text-ink-secondary">Map integration will be connected in a later phase. This placeholder preserves the approved profile structure.</p>
              </Card>
            </div>
          </div>

          <div className="flex flex-col gap-4 text-sm md:flex-row md:items-center md:justify-between">
            <Button href="/schools" size="sm" variant="ghost">Back to Schools Directory</Button>
            <Link className="public-link" href={`mailto:info@amisfct.org?subject=${encodeURIComponent("Website Feedback")}&body=${encodeURIComponent(`School: ${school.name}\n\nPlease describe the incorrect information:`)}`}>
              Report Incorrect Information
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
