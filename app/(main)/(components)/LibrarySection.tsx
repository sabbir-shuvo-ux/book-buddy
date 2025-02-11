import { getAuthenticatedUser } from "@/lib/getAuthenticatedUser";
import { getAllUserBooksAndIds, totalBooks } from "@/services/userService";

import { Button } from "@/components/ui/button";
import { getWelcomeMessage } from "@/lib/getWelcomeMessage";
import { cn } from "@/lib/utils";
import Link from "next/link";
import BookCard from "./BookCard";

type Props = {
  isEmail?: boolean;
  title?: string;
  isPageLink?: boolean;
  dataLimit?: number;
};

const LibrarySection = async ({
  isEmail = false,
  title,
  isPageLink = false,
  dataLimit,
}: Props) => {
  const user = await getAuthenticatedUser();
  const bookCount = await totalBooks();

  const { bookIds, books } = await getAllUserBooksAndIds(dataLimit);

  return (
    <section
      className={cn("container pt-10", books.length > 0 ? "pb-10" : "pb-0")}
    >
      <div className="flex justify-between items-center gap-4 flex-wrap">
        <div>
          <h3 className="text-lg font-semibold capitalize">
            {isEmail
              ? getWelcomeMessage(user.email.replace(/@.*$/, ""))
              : title}
          </h3>

          {bookCount ? (
            <h4>You are Reading {bookCount} books now</h4>
          ) : (
            <h4>you dont have any books in your library</h4>
          )}
        </div>
        <div className="flex gap-4">
          <Button asChild variant={"default"}>
            <Link href={"/library/add-books"}>Add books</Link>
          </Button>
          {isPageLink
            ? books.length > 0 && (
                <Button asChild variant={"link"}>
                  <Link href={"/library"}>See More</Link>
                </Button>
              )
            : null}
        </div>
      </div>
      {books.length > 0 && (
        <div className="grid grid-cols-1 min-[400px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 min-[1500px]:grid-cols-6 gap-8 mt-8">
          {books?.map((item) => (
            <BookCard key={item.id} data={item} userBookListId={bookIds} />
          ))}
        </div>
      )}
    </section>
  );
};

export default LibrarySection;
