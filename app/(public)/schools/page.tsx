import { Prisma, SchoolLevel, SchoolStatus } from "@prisma/client";

import { EmptyState } from "@/components/public/empty-state";
import { PageHero } from "@/components/public/page-hero";
import { SchoolCard } from "@/components/public/school-card";
import { SchoolDirectoryFilters } from "@/components/public/school-directory-filters";
import { prisma } from "@/lib/db";
import { getBadgeVisibilityEnabled, getCurrentDuesSetting, isSchoolActiveMember } from "@/lib/dues";
import { AREA_COUNCILS, getSchoolLevelLabel } from "@/lib/schools";
import { schoolDirectoryQuerySchema } from "@/lib/validation/schools";

export default async function SchoolsPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; areaCouncil?: string; level?: SchoolLevel }>;
}) {
  const params = await searchParams;
  const parsed = schoolDirectoryQuerySchema.safeParse(params);
  const parsedFilters = parsed.success ? parsed.data : {};
  const filters = {
    search: typeof parsedFilters.search === "string" ? parsedFilters.search : undefined,
    areaCouncil: typeof parsedFilters.areaCouncil === "string" ? parsedFilters.areaCouncil : undefined,
    level: Object.values(SchoolLevel).includes(parsedFilters.level as SchoolLevel) ? (parsedFilters.level as SchoolLevel) : undefined,
  };

  const where: Prisma.SchoolWhereInput = {
    status: SchoolStatus.APPROVED,
    ...(filters.search ? { name: { contains: filters.search, mode: "insensitive" as const } } : {}),
    ...(filters.areaCouncil ? { areaCouncil: filters.areaCouncil } : {}),
    ...(filters.level ? { level: filters.level } : {}),
  };

  const [currentDuesSetting, badgeVisible] = await Promise.all([getCurrentDuesSetting(), getBadgeVisibilityEnabled()]);

  const [schools, totalApproved] = await Promise.all([
    prisma.school.findMany({
      where,
      orderBy: { name: "asc" },
      include: {
        duesRecords: {
          select: {
            academicYear: true,
            status: true,
          },
        },
      },
    }),
    prisma.school.count({ where: { status: SchoolStatus.APPROVED } }),
  ]);

  return (
    <main id="main-content">
      <PageHero
        breadcrumbItems={[{ label: "Home", href: "/" }, { label: "Schools" }]}
        subtitle={`${totalApproved} approved member schools across the six Area Councils of the FCT.`}
        title="Find a Member School"
      />

      <section className="public-section pt-6">
        <div className="public-container space-y-8">
          <SchoolDirectoryFilters areaCouncil={filters.areaCouncil} level={filters.level} search={filters.search} />

          <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-ink-secondary" role="status">
            <p>
              Showing <span className="font-semibold text-ink-primary">{schools.length}</span> of <span className="font-semibold text-ink-primary">{totalApproved}</span> schools
            </p>
            <p>{AREA_COUNCILS.length} Area Councils supported</p>
          </div>

          {schools.length === 0 ? (
            <EmptyState description="No approved schools match your current search or filter combination. Try clearing the filters or using a broader search term." title="No schools found" />
          ) : (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {schools.map((school) => (
                <SchoolCard
                  areaCouncil={school.areaCouncil}
                  isActiveMember={isSchoolActiveMember(school.duesRecords, currentDuesSetting?.academicYear ?? null, badgeVisible)}
                  key={school.id}
                  level={getSchoolLevelLabel(school.level)}
                  name={school.name}
                  phone={school.phone}
                  photoUrl={school.photoUrl}
                  slug={school.slug}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
