"use client";

import {
  AddToLibraryAction,
  RemoveFromLibraryAction,
} from "@/actions/queriesActions";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoCloseOutline } from "react-icons/io5";
import { MdFavoriteBorder } from "react-icons/md";

type Props = {
  bookId: string;
  userBookListId: string[];
};

const BooksActions = ({ bookId, userBookListId }: Props) => {
  const [isFav, setIsFav] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setIsFav(userBookListId.includes(bookId));

    console.log(userBookListId);
  }, [userBookListId, bookId]);

  // handle favorites books
  const handleFavorites = async () => {
    const toggleAction = isFav ? RemoveFromLibraryAction : AddToLibraryAction;
    setLoading(true);
    // wait for the result until show processing
    toast
      .promise(toggleAction(bookId), {
        loading: "Processing...",
        success: (res) => res.message,
        error: (err) => err.message || "An error occurred",
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="flex gap-4 mt-2">
      <Button
        disabled={loading}
        onClick={handleFavorites}
        variant={"ghost"}
        size={"icon-lg"}
      >
        {isFav ? <IoCloseOutline /> : <MdFavoriteBorder />}
      </Button>
    </div>
  );
};

export default BooksActions;
