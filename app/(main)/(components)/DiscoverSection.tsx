import { Button } from "@/components/ui/button";
import { getAllUserBooksAndIds, getBooks } from "@/services/userService";
import Link from "next/link";
import BookCard from "./BookCard";

type Props = {
  isPageLink?: boolean;
  dataLimit?: number;
  languages?: string[];
  countries?: string[];
};

const DiscoverSection = async ({
  isPageLink = false,
  dataLimit,
  countries,
  languages,
}: Props) => {
  const data = await getBooks({ languages, countries: countries }, dataLimit);

  const { bookIds } = await getAllUserBooksAndIds();

  return (
    <>
      <section className="container py-10">
        <div className="flex justify-between">
          <div className="">
            <h3 className="text-lg font-semibold capitalize">
              Browse Books You Might Like
            </h3>
          </div>

          {isPageLink ? (
            <Button asChild variant={"link"}>
              <Link href={"/discover"}>See More</Link>
            </Button>
          ) : null}
        </div>
        <div className="grid grid-cols-1 min-[400px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 min-[1500px]:grid-cols-6 gap-8 mt-8">
          {data?.map((item) => {
            if (!bookIds.includes(item.id)) {
              return (
                <BookCard key={item.id} data={item} userBookListId={bookIds} />
              );
            }
          })}
        </div>
      </section>
    </>
  );
};

export default DiscoverSection;
