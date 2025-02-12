import FilterSidebar from "./(components)/FilterSidebar";

const DiscoverLayout = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="grid grid-cols-[300px_1fr] gap-4">
      <FilterSidebar />
      {children}
    </div>
  );
};

export default DiscoverLayout;
