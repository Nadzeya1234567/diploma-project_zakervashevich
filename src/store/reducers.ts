import { combineReducers } from "redux";
import { bookReducer } from "./book/bookSlice";
import { booksReducer } from "./books/booksSlice";
import { newBooksReducer } from "./newBooks/newBooksSlice";

export default combineReducers({
  books: booksReducer,
  newBooks: newBooksReducer,
  book: bookReducer,
});
