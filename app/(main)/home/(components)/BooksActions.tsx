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

type Props = {
  bookId: string;
  isFav: boolean;
};

const BooksActions = ({ bookId, isFav }: Props) => {
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
    <div className="">
      <Button onClick={handleFavorites} variant={"ghost"} size={"icon"}>
        {isFav ? <IoCloseOutline /> : <MdFavoriteBorder />}
      </Button>

      <Button variant={"ghost"} size={"icon"}>
        <FaShareFromSquare />
      </Button>
    </div>
  );
};

export default BooksActions;
