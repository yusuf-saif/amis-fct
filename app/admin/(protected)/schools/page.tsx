import Link from "next/link";
import { AdminRole, Prisma, SchoolStatus } from "@prisma/client";

import { AdminBanner } from "@/components/admin/admin-banner";
import { requireAdminUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { ADMIN_SCHOOL_STATUS_TABS, AREA_COUNCILS, getSchoolStatusLabel } from "@/lib/schools";
import { adminSchoolListQuerySchema } from "@/lib/validation/schools";

export default async function AdminSchoolsPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; areaCouncil?: string; status?: SchoolStatus; feedback?: string }>;
}) {
  await requireAdminUser([AdminRole.SUPER_ADMIN]);

  const params = await searchParams;
  const parsed = adminSchoolListQuerySchema.safeParse(params);
  const parsedFilters = parsed.success ? parsed.data : {};
  const filters = {
    search: typeof parsedFilters.search === "string" ? parsedFilters.search : undefined,
    areaCouncil: typeof parsedFilters.areaCouncil === "string" ? parsedFilters.areaCouncil : undefined,
    status: Object.values(SchoolStatus).includes(parsedFilters.status as SchoolStatus) ? (parsedFilters.status as SchoolStatus) : undefined,
  };
  const activeStatus = filters.status ?? SchoolStatus.PENDING;

  const [schools, counts] = await Promise.all([
    prisma.school.findMany({
      where: {
        status: activeStatus,
        ...(filters.search ? { name: { contains: filters.search, mode: "insensitive" as const } } : {}),
        ...(filters.areaCouncil ? { areaCouncil: filters.areaCouncil } : {}),
      } satisfies Prisma.SchoolWhereInput,
      orderBy: [{ submittedAt: "desc" }, { name: "asc" }],
    }),
    Promise.all(
      ADMIN_SCHOOL_STATUS_TABS.map(async (tab) => ({
        status: tab.value,
        count: await prisma.school.count({ where: { status: tab.value } }),
      })),
    ),
  ]);

  return (
    <div className="space-y-6">
      <div className="card-admin space-y-4">
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.08em] text-brand-green-700">Schools</p>
          <h1 className="text-3xl font-semibold text-slate-950">School applications and directory records</h1>
          <p className="max-w-3xl text-sm text-slate-600">Review pending registrations, manage approved listings, and control school visibility on the public directory.</p>
        </div>

        {params.feedback === "updated" ? <AdminBanner title="School record updated" tone="success" /> : null}

        <div className="flex flex-wrap gap-3">
          {ADMIN_SCHOOL_STATUS_TABS.map((tab) => {
            const count = counts.find((item) => item.status === tab.value)?.count ?? 0;
            const href = `/admin/schools?status=${tab.value}${filters.search ? `&search=${encodeURIComponent(filters.search)}` : ""}${filters.areaCouncil ? `&areaCouncil=${encodeURIComponent(filters.areaCouncil)}` : ""}`;
            const active = activeStatus === tab.value;

            return (
              <Link className={`inline-flex min-h-11 items-center rounded-full border px-4 py-2 text-sm font-medium ${active ? "border-emerald-200 bg-emerald-50 text-emerald-800" : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"}`} href={href} key={tab.value}>
                {tab.label} ({count})
              </Link>
            );
          })}
        </div>
      </div>

      <div className="card-admin space-y-4">
        <form className="grid gap-4 md:grid-cols-[minmax(0,1.2fr)_minmax(0,0.9fr)_auto] md:items-end" method="get">
          <input name="status" type="hidden" value={activeStatus} />
          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-900">Search by school name</span>
            <input className="input-base" defaultValue={filters.search ?? ""} name="search" placeholder="Search schools" type="search" />
          </label>
          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-900">Area Council</span>
            <select className="input-base" defaultValue={filters.areaCouncil ?? ""} name="areaCouncil">
              <option value="">All Area Councils</option>
              {AREA_COUNCILS.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </label>
          <button className="btn-primary" type="submit">Apply</button>
        </form>

        {schools.length === 0 ? (
          <AdminBanner description="Try adjusting the search term or switching to another status tab." title={`No ${getSchoolStatusLabel(activeStatus).toLowerCase()} schools found`} />
        ) : (
          <div className="grid gap-4 xl:grid-cols-2">
            {schools.map((school) => (
              <article className="rounded-xl border border-slate-200 bg-white p-5" key={school.id}>
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="space-y-2">
                    <h2 className="text-xl font-semibold text-slate-950">{school.name}</h2>
                    <p className="text-sm text-slate-600">{school.areaCouncil} · {getSchoolStatusLabel(school.status)}</p>
                    <p className="text-sm text-slate-600">Submitted {school.submittedAt.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</p>
                  </div>
                  <Link className="btn-secondary" href={`/admin/schools/${school.id}`}>Review</Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
