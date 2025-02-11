import { Button } from "@/components/ui/button";
import { getAllUsersBooks, userSuggestionsBooks } from "@/services/userService";
import Link from "next/link";
import BookCard from "./BookCard";

type Props = {
  isPageLink?: boolean;
};

const DiscoverSection = async ({ isPageLink = false }: Props) => {
  const data = await userSuggestionsBooks();

  const userBooks = await getAllUsersBooks();
  const userBookListId = userBooks.map((item) => item.bookId);

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
          {data?.map((item) => (
            <BookCard
              key={item.id}
              data={item}
              userBookListId={userBookListId}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default DiscoverSection;
