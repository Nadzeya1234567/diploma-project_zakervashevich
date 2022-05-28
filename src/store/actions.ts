import { booksActions } from "./books/booksSlice";
import { newBooksActions } from "./newBooks/newBooksSlice";

const actions = {
  ...booksActions,
  ...newBooksActions,
};

export default actions;
