import { LibrarySectionSekeleton } from "@/components/Skeletons";
import { Suspense } from "react";
import DiscoverSection from "../(components)/DiscoverSection";

const DiscoverPage = () => {
  return (
    <Suspense fallback={<LibrarySectionSekeleton />}>
      <DiscoverSection />
    </Suspense>
  );
};

export default DiscoverPage;
