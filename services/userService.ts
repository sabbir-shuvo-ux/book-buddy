import { getAuthenticatedUser } from "@/lib/getAuthenticatedUser";
import { handleError } from "@/lib/handleError";
import { prisma } from "@/lib/prisma";
import { AddNewBookSchemaType } from "@/schemas/addNewBookSchema";
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

// get all user books and Ids
export const getAllUserBooksAndIds = cache(async (limit?: number) => {
  const { id } = await getAuthenticatedUser();

  // Fetch all book for bookId
  const allBookIds = await prisma.userBookList.findMany({
    where: { userId: id },
    select: { bookId: true },
  });

  // Fetch book details with limit, ordered by when the user added them
  const books = await prisma.userBookList.findMany({
    where: { userId: id },
    include: { Book: true },
    orderBy: { createdAt: "desc" },
    take: limit || undefined,
  });

  return {
    bookIds: allBookIds.map((i) => i.bookId),
    books: books.map((item) => item.Book),
  };
});

type FilterOptions = {
  languages?: string[];
  countries?: string[];
};

// get books for new user and also show limited items and also filter the books
export const getBooks = cache(
  async (filters?: FilterOptions, limit?: number) => {
    const { id } = await getAuthenticatedUser();
    const { languages, countries } = filters || {};

    console.log("server : ", { languages, countries });

    const books = await prisma.book.findMany({
      where: {
        userId: null,
        UserBookList: {
          none: { userId: id },
        },
        AND: [
          {
            OR: [
              languages?.length ? { language: { in: languages } } : {},
              countries?.length ? { country: { in: countries } } : {},
            ],
          },
        ],
      },
      take: limit || undefined,
    });

    return books;
  }
);

// get filter data from books

export const getBookFilters = cache(async () => {
  const books = await prisma.book.findMany({
    select: {
      language: true,
      country: true,
    },
  });

  const languages = Array.from(
    new Set(books.map((book) => book.language).filter(Boolean))
  ).map((language, index) => ({ id: String(index + 1), label: language }));

  const countries = Array.from(
    new Set(books.map((book) => book.country).filter(Boolean))
  ).map((country, index) => ({ id: String(index + 1), label: country }));

  return { languages, countries };
});

// add to library
export const addToLibrary = async (
  bookId: string
): Promise<{ success: boolean; message: string }> => {
  const user = await getAuthenticatedUser();

  // Check if the book exists in the users library
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

  // add book to user library
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

  // Check if the book exists in the users library
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

// create new book and update user book list
export const createBookAndUpdateUserBookList = async (
  data: AddNewBookSchemaType
): Promise<{ success: boolean; message: string }> => {
  const user = await getAuthenticatedUser();

  const { title, author, country, language, pages, year, imageLink } = data;

  await prisma.$transaction(async (tx) => {
    // Create new book
    const newBook = await tx.book.create({
      data: {
        title,
        author: author || "Unknown",
        country,
        language,
        pages,
        year,
        imageLink,
        userId: user.id,
      },
    });

    // Create UserBookList
    await tx.userBookList.create({
      data: {
        userId: user.id,
        bookId: newBook.id,
      },
    });
  });

  return { success: true, message: "New book added to your library" };
};
