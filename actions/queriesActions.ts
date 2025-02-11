"use server";

import { handleError } from "@/lib/handleError";
import { AddNewBookSchemaType } from "@/schemas/addNewBookSchema";
import {
  addToLibrary,
  createBookAndUpdateUserBookList,
  removeFromLibrary,
} from "@/services/userService";
import { revalidatePath } from "next/cache";

// add books to user book list
const AddToLibraryAction = async (
  bookId: string
): Promise<{ success: boolean; message: string }> => {
  try {
    const { message, success } = await addToLibrary(bookId);

    if (success) {
      revalidatePath("/home");
    }

    return { success: success, message: message };
  } catch (error) {
    const res = handleError(error);
    console.error("Error in addToLibraryAction:", res.error);
    return {
      success: false,
      message: res.error,
    };
  }
};

// remove book from user book list
const RemoveFromLibraryAction = async (
  bookId: string
): Promise<{ success: boolean; message: string }> => {
  try {
    const { message, success } = await removeFromLibrary(bookId);

    if (success) {
      revalidatePath("/home");
    }

    return { success: success, message: message };
  } catch (error) {
    const res = handleError(error);
    console.error("Error in removeFromLibrary:", res.error);
    return {
      success: false,
      message: res.error,
    };
  }
};

// create new book in user book list and book
const createAndUpdateBook = async (
  data: AddNewBookSchemaType
): Promise<{ success: boolean; message: string }> => {
  try {
    const { message, success } = await createBookAndUpdateUserBookList(data);

    if (success) {
      revalidatePath("/home");
      revalidatePath("/library");
    }
    return { success: success, message: message };
  } catch (error) {
    const res = handleError(error);
    console.error("Error in create and update book:", res.error);

    return {
      success: false,
      message: res.error,
    };
  }
};

export { AddToLibraryAction, RemoveFromLibraryAction, createAndUpdateBook };
