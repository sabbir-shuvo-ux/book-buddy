import { LibrarySectionSekeleton } from "@/components/Skeletons";
import { Suspense } from "react";
import LibrarySection from "../(components)/LibrarySection";

const LibraryPage = async () => {
  return (
    <Suspense fallback={<LibrarySectionSekeleton />}>
      <LibrarySection title="Your Own Library" />
    </Suspense>
  );
};

export default LibraryPage;
