import { Button } from "@/components/ui/button";
import { getAllUsersBooks, userSuggestionsBooks } from "@/services/userService";
import Link from "next/link";
import BookCard from "./BookCard";

const DiscoverSection = async () => {
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

          <Button asChild variant={"link"}>
            <Link href={"/discover"}>See More</Link>
          </Button>
        </div>
        <div className="grid grid-cols-6 gap-8 mt-8">
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
