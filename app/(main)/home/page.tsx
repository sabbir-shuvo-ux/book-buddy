import React, { Suspense } from "react";
import WelcomeSectionWrapper from "./(components)/WelcomeSectionWrapper";

const HomePage = () => {
  return (
    <>
      <Suspense fallback={<p>Loading...</p>}>
        <WelcomeSectionWrapper />
      </Suspense>
    </>
  );
};

export default HomePage;
