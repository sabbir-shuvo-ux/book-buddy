import AddNewBookForm from "@/components/forms/AddNewBookForm";

const AddBooks = () => {
  return (
    <section className="container min-h-[400px] h-full max-h-full grid place-items-center">
      <div className="max-w-[500px] mx-auto bg-white px-8 py-4 w-full my-8 rounded-lg">
        <h2 className="text-xl font-semibold capitalize">Add a New Book</h2>
        <p className="text-sm font-light border-b border-border border-solid pb-4 mb-4">
          Keep track of your reading progress by adding a new book to your list.
          Whether it's a novel, a textbook, or a personal development book, you
          can easily log its details and monitor your progress as you read.
          Start by entering the book's title, author, and any notes you'd like
          to include!
        </p>

        <AddNewBookForm />
      </div>
    </section>
  );
};

export default AddBooks;
