import { Suspense } from "react";
import LibrarySection from "@/app/(main)/(components)/LibrarySection";
import DiscoverSection from "../(components)/DiscoverSection";
import { LibrarySectionSekeleton } from "@/components/Skeletons";

const HomePage = () => {
  return (
    <>
      <Suspense fallback={<LibrarySectionSekeleton />}>
        <LibrarySection isEmail isPageLink dataLimit={6} />
      </Suspense>
      <Suspense fallback={<LibrarySectionSekeleton />}>
        <DiscoverSection isPageLink dataLimit={6} />
      </Suspense>
    </>
  );
};

export default HomePage;
