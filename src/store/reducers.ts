import { combineReducers } from "redux";
import { booksReducer } from "./books/booksSlice";
import { newBooksReducer } from "./newBooks/newBooksSlice";

export default combineReducers({
  // [name]: nameReducer
  books: booksReducer,
  newBooks: newBooksReducer,
});
