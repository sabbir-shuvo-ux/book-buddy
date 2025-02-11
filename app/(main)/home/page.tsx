import { Suspense } from "react";
import LibrarySection from "@/app/(main)/(components)/LibrarySection";
import DiscoverSection from "../(components)/DiscoverSection";
import { LibrarySectionSekeleton } from "@/components/Skeletons";

const HomePage = () => {
  return (
    <>
      <Suspense fallback={<LibrarySectionSekeleton />}>
        <LibrarySection isEmail isPageLink />
      </Suspense>
      <Suspense fallback={<LibrarySectionSekeleton />}>
        <DiscoverSection isPageLink />
      </Suspense>
    </>
  );
};

export default HomePage;
