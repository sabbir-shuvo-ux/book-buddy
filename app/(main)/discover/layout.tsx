import FilterSidebar from "./(components)/FilterSidebar";

const DiscoverLayout = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="grid max-md:grid-cols-1 grid-cols-[300px_1fr] gap-4">
      <FilterSidebar className="max-md:hidden" />
      {children}
    </div>
  );
};

export default DiscoverLayout;
