import { getAuthenticatedUser } from "@/lib/getAuthenticatedUser";
import { getAllUsersBooks, totalBooks } from "@/services/userService";

import { Button } from "@/components/ui/button";
import { getWelcomeMessage } from "@/lib/getWelcomeMessage";
import { cn } from "@/lib/utils";
import Link from "next/link";
import BookCard from "./BookCard";

type Props = {
  isEmail?: boolean;
  title?: string;
  isPageLink?: boolean;
};

const LibrarySection = async ({
  isEmail = false,
  title,
  isPageLink = false,
}: Props) => {
  const user = await getAuthenticatedUser();
  const bookCount = await totalBooks();

  const data = await getAllUsersBooks();

  const userBookListId = data.map((item) => item.bookId);
  const userBookData = data.map((item) => item.Book);

  return (
    <section
      className={cn("container pt-10", data.length > 0 ? "pb-10" : "pb-0")}
    >
      <div className="flex justify-between">
        <div className="">
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
            ? data.length > 0 && (
                <Button asChild variant={"link"}>
                  <Link href={"/library"}>See More</Link>
                </Button>
              )
            : null}
        </div>
      </div>
      {userBookData.length > 0 && (
        <div className="grid grid-cols-6 gap-8 mt-8">
          {userBookData?.map((item) => (
            <BookCard
              key={item.id}
              data={item}
              userBookListId={userBookListId}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default LibrarySection;
