import { bookActions } from "./book/bookSlice";
import { booksActions } from "./books/booksSlice";
import { newBooksActions } from "./newBooks/newBooksSlice";

const actions = {
  ...booksActions,
  ...newBooksActions,
  ...bookActions,
};

export default actions;
