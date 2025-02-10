import { getAuthenticatedUser } from "@/lib/getAuthenticatedUser";
import { getWelcomeMessage } from "@/lib/getWelcomeMessage";
import {
  getAllUsersBooks,
  totalBooks,
  userSuggestionsBooks,
} from "@/services/userService";
import Link from "next/link";

import BookCard from "./BookCard";

const WelcomeSectionWrapper = async () => {
  const user = await getAuthenticatedUser();
  const bookCount = await totalBooks();

  const userBooks = await getAllUsersBooks();
  const autoSuggestions = await userSuggestionsBooks();

  return (
    <section className="container py-10">
      <div className="flex justify-between">
        <div className="">
          <h3 className="text-lg font-semibold capitalize">
            {getWelcomeMessage(user.email.replace(/@.*$/, ""))}
          </h3>

          {userBooks.length > 0 ? (
            <h4>You are Reading {bookCount} books now</h4>
          ) : (
            <h4>You dont have any books, try some from below.</h4>
          )}
        </div>
        {userBooks.length > 0 ? (
          <Link href={"/library"}>See More</Link>
        ) : (
          <Link href={"/discover"}>See More</Link>
        )}
      </div>

      <div className="grid grid-cols-6 gap-8 mt-8">
        {userBooks.length > 0
          ? userBooks?.map(({ Book: item, userId }) => (
              <BookCard
                key={item.id}
                data={item}
                isFav={user.id === userId ? true : false}
              />
            ))
          : autoSuggestions.map((item) => (
              <BookCard key={item.id} data={item} isFav={false} />
            ))}
      </div>
    </section>
  );
};

export default WelcomeSectionWrapper;
