import { Button } from "@/components/public/button";
import { AREA_COUNCILS } from "@/lib/schools";

export function SchoolDirectoryFilters({
  search,
  areaCouncil,
  level,
}: {
  search?: string;
  areaCouncil?: string;
  level?: string;
}) {
  const hasFilters = Boolean(search || areaCouncil || level);

  return (
    <details className="rounded-2xl border border-surface-line bg-surface-page p-4 md:border-0 md:bg-transparent md:p-0" open>
      <summary className="mb-4 cursor-pointer text-sm font-semibold text-ink-primary md:hidden">Filter & Search Schools</summary>
      <form className="grid gap-4 md:grid-cols-[minmax(0,1.3fr)_repeat(2,minmax(0,0.8fr))_auto] md:items-end" method="get">
        <label className="space-y-2">
          <span className="text-sm font-medium text-ink-primary">Search by school name</span>
          <input className="input-base" defaultValue={search ?? ""} name="search" placeholder="e.g. Nurul Huda" type="search" />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-ink-primary">Area Council</span>
          <select className="input-base" defaultValue={areaCouncil ?? ""} name="areaCouncil">
            <option value="">All Area Councils</option>
            {AREA_COUNCILS.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-ink-primary">School Level</span>
          <select className="input-base" defaultValue={level ?? ""} name="level">
            <option value="">All Levels</option>
            <option value="PRIMARY">Primary</option>
            <option value="SECONDARY">Secondary</option>
            <option value="COMBINED">Both / Combined</option>
          </select>
        </label>

        <Button size="md" type="submit">Apply Filters</Button>

        {hasFilters ? <Button href="/schools" size="md" variant="ghost">Clear Filters</Button> : <span />}
      </form>
    </details>
  );
}
