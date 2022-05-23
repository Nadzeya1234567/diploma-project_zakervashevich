import { combineReducers } from "redux";
import { booksReducer } from "./books/booksSlice";

export default combineReducers({
  // [name]: nameReducer
  books: booksReducer,
});
