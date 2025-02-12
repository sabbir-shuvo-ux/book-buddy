import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import FilterSidebar from "./FilterSidebar";

type Props = {
  className?: string;
};

const FilterMobileSidebar = ({ className }: Props) => {
  return (
    <Sheet>
      <SheetTrigger className={cn(className)} asChild>
        <Button variant="default">Filter</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle />
          <SheetDescription />
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <FilterSidebar />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default FilterMobileSidebar;
