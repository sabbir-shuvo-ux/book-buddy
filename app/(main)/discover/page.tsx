import { LibrarySectionSekeleton } from "@/components/Skeletons";
import { Suspense } from "react";
import DiscoverSection from "../(components)/DiscoverSection";

const DiscoverPage = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  console.log(searchParams);

  const getLanguagesParams = Array.isArray(searchParams?.languages)
    ? searchParams.languages
    : searchParams?.languages?.split(",");

  const getCountriesParams = Array.isArray(searchParams?.countries)
    ? searchParams.countries
    : searchParams?.countries?.split(",");

  return (
    <Suspense fallback={<LibrarySectionSekeleton />}>
      <DiscoverSection
        countries={getCountriesParams}
        languages={getLanguagesParams}
        className="min-[1500px]:grid-cols-5"
      />
    </Suspense>
  );
};

export default DiscoverPage;
