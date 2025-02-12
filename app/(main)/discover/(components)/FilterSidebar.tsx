import { getBookFilters } from "@/services/userService";
import FilterForm from "@/components/forms/FilterForm";
import { Suspense } from "react";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

const FilterSidebar = async ({ className }: Props) => {
  const { countries, languages } = await getBookFilters();

  return (
    <aside className={cn("px-4 py-10 bg-white", className)}>
      <h3 className="font-bold text-xl border-b border-border border-solid">
        Filter
      </h3>

      <Suspense fallback={<p>Loading...</p>}>
        <FilterForm countries={countries} languages={languages} />
      </Suspense>
    </aside>
  );
};

export default FilterSidebar;
