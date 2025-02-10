import Image from "next/image";
import BooksActions from "./BooksActions";
import { Book } from "@prisma/client";

const BookCard = ({ data, isFav }: { data: Book; isFav: boolean }) => {
  return (
    <article
      className="bg-white border-[rgb(232,232,232)] border-[2px] border-solid py-6 px-4 rounded-md"
      key={data.id}
    >
      <div className="max-w-[150px] w-full h-[180px] relative mx-auto">
        <Image
          src={data.imageLink}
          alt={data.title}
          className="object-cover rounded-md"
          fill
        />
      </div>

      <div className="text-center mt-4">
        <h3 className="font-semibold text-base truncate">{data.title}</h3>

        <p>
          {data.author} - {data.year}
        </p>

        <BooksActions isFav={isFav} bookId={data.id} />
      </div>
    </article>
  );
};

export default BookCard;
