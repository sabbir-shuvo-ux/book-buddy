import { Skeleton } from "@/components/ui/skeleton";

export function LibrarySectionSekeleton() {
  return (
    <div className="container py-10">
      <div className="space-y-2 flex justify-between">
        <div className="">
          <Skeleton className="h-[28px] w-[300px]" />
        </div>
        <Skeleton className="h-[28px] w-[100px]" />
      </div>
      <div className="grid grid-cols-1 min-[400px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 min-[1500px]:grid-cols-6 gap-8 mt-8">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="bg-white border-[rgb(232,232,232)] relative border-[2px] border-solid rounded-md"
          >
            <Skeleton className="h-[37px] w-[37px] absolute right-2 top-2" />
            <Skeleton className="w-full h-[180px] mx-auto" />

            <div className="px-2 py-4 h-full">
              <Skeleton className="h-[24px] mb-2 w-full" />

              <div className="grid gap-1">
                {Array.from({ length: 4 }).map((_, subIndex) => (
                  <div key={subIndex} className="flex gap-4 w-full">
                    <Skeleton className="h-[20px] w-full" />
                    <Skeleton className="h-[20px] w-full" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
