import Image from "next/image";
import BooksActions from "@/app/(main)/(components)/BooksActions";
import { Book } from "@prisma/client";

const BookCard = ({
  data,
  userBookListId,
}: {
  data: Book;
  userBookListId: string[];
}) => {
  return (
    <article
      className="bg-white border-[rgb(232,232,232)] border-[2px] relative border-solid rounded-md"
      key={data.id}
    >
      <BooksActions userBookListId={userBookListId} bookId={data.id} />

      <div className="w-full h-[180px] relative mx-auto">
        <Image
          src={data.imageLink}
          alt={data.title}
          className="object-cover rounded-md"
          fill
        />
      </div>

      <div className="text-center px-2 py-4 h-[calc(100%-180px)]">
        <h3 className="font-semibold text-base truncate mb-2">{data.title}</h3>
        <div className="flex flex-col gap-1">
          <p className="text-sm">
            Author : <span>{data.author}</span>
          </p>

          {data.year && (
            <p className="text-sm">
              Published : <span>{data.year}</span>
            </p>
          )}
          {data.country && (
            <p className="text-sm">
              Country : <span>{data.country}</span>
            </p>
          )}

          {data.language && (
            <p className="text-sm">
              Language : <span className="font-semibold ">{data.language}</span>
            </p>
          )}
        </div>
      </div>
    </article>
  );
};

export default BookCard;
