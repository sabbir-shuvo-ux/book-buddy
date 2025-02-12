import { getBookFilters } from "@/services/userService";
import FilterForm from "@/components/forms/FilterForm";
import { Suspense } from "react";

const FilterSidebar = async () => {
  const { countries, languages } = await getBookFilters();

  return (
    <aside className="px-4 py-10 bg-white">
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
