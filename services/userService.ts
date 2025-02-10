import { getAuthenticatedUser } from "@/lib/getAuthenticatedUser";
import { handleError } from "@/lib/handleError";
import { prisma } from "@/lib/prisma";
import { cache } from "react";

// total books count
export const totalBooks = cache(async () => {
  try {
    const { id } = await getAuthenticatedUser();

    const count = await prisma.userBookList.count({
      where: { userId: id },
    });

    return count;
  } catch (error) {
    const res = handleError(error);
    console.log(res.error);
    return 0;
  }
});

// get all user collections books
export const getAllUsersBooks = cache(async () => {
  const { id } = await getAuthenticatedUser();

  const books = await prisma.userBookList.findMany({
    where: { userId: id },
    include: { Book: true },
  });

  return books;
});

// get some books for first time user
export const userSuggestionsBooks = cache(async () => {
  const books = await prisma.book.findMany({
    where: { userId: null },
  });

  return books;
});

// add to library
export const addToLibrary = async (
  bookId: string
): Promise<{ success: boolean; message: string }> => {
  const user = await getAuthenticatedUser();

  const existingBook = await prisma.userBookList.findUnique({
    where: {
      userId_bookId: {
        userId: user.id,
        bookId: bookId,
      },
    },
  });

  if (existingBook) {
    return { success: false, message: "Book already in Library" };
  }

  const userBook = await prisma.userBookList.create({
    data: {
      bookId: bookId,
      userId: user.id,
    },
  });

  if (!userBook.bookId && !userBook.userId) {
    throw new Error("Something wrong when try to add library");
  }

  return { success: true, message: "Book Added To Your Library" };
};

// remove from library
export const removeFromLibrary = async (
  bookId: string
): Promise<{ success: boolean; message: string }> => {
  const user = await getAuthenticatedUser();

  // 🛑 Check if the book exists in the user's library
  const existingBook = await prisma.userBookList.findUnique({
    where: {
      userId_bookId: {
        userId: user.id,
        bookId: bookId,
      },
    },
  });

  if (!existingBook) {
    return { success: false, message: "Book not found in your library" };
  }

  // Remove the book from the library
  await prisma.userBookList.delete({
    where: {
      userId_bookId: {
        userId: user.id,
        bookId: bookId,
      },
    },
  });

  return { success: true, message: "Book removed from your library" };
};
