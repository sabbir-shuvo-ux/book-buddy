"use client";

import {
  addToLibraryAction,
  removeFromLibraryAction,
} from "@/actions/queriesActions";
import { Button } from "@/components/ui/button";
import { FaShareFromSquare } from "react-icons/fa6";
import { MdFavoriteBorder } from "react-icons/md";
import { IoCloseOutline } from "react-icons/io5";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

type Props = {
  bookId: string;
  userBookListId: string[];
};

const BooksActions = ({ bookId, userBookListId }: Props) => {
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    setIsFav(userBookListId.includes(bookId));

    console.log(userBookListId);
  }, [userBookListId, bookId]);

  // handle favorites books
  const handleFavorites = async () => {
    const toggleAction = isFav ? removeFromLibraryAction : addToLibraryAction;

    // wait for the result until show processing
    toast.promise(toggleAction(bookId), {
      loading: "Processing...",
      success: (res) => res.message,
      error: (err) => err.message || "An error occurred",
    });
  };

  return (
    <div className="flex gap-4 mt-2">
      <Button onClick={handleFavorites} variant={"ghost"} size={"icon-lg"}>
        {isFav ? <IoCloseOutline /> : <MdFavoriteBorder />}
      </Button>

      <Button variant={"ghost"} size={"icon-lg"}>
        <FaShareFromSquare />
      </Button>
    </div>
  );
};

export default BooksActions;
