import { combineReducers } from "redux";
import { bookReducer } from "./book/bookSlice";
import { booksReducer } from "./books/booksSlice";
import { newBooksReducer } from "./newBooks/newBooksSlice";
import { authReducer } from "./auth/authSlice";

export default combineReducers({
  books: booksReducer,
  newBooks: newBooksReducer,
  book: bookReducer,
  auth: authReducer,
});
