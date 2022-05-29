import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BooksGrade } from "../../enums/booksGrade";
import BooksType from "../../types/booksType";
import { fetchBooks } from "./booksThunks";
import Storage from "../../helpers/Storage";

type GradesType = {
  [prop: string]: BooksGrade;
};
//grades = {
// [1]: +1; //пост лайкнут
// [2]: -1; //пост дизлайкнут
//}

type StoreType = {
  data: BooksType[];
  total: string;
  loading: boolean;
  error?: string;
  grades: GradesType;
  bookmarks: string[];
};

const initialState: StoreType = {
  data: [],
  total: "0",
  loading: false,
  grades: Storage.get("grades", {}),
  bookmarks: Storage.get("bookmarks", []),
};

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    likeBook: (state, { payload: postId }: PayloadAction<string>) => {
      if (state.grades[postId] === BooksGrade.like) {
        delete state.grades[postId];
      } else {
        state.grades[postId] = BooksGrade.like;
      }

      Storage.set("grades", state.grades);
    },
    dislikeBook: (state, { payload: postId }: PayloadAction<string>) => {
      if (state.grades[postId] === BooksGrade.dislike) {
        delete state.grades[postId];
      } else {
        state.grades[postId] = BooksGrade.dislike;
      }
      Storage.set("grades", state.grades);
    },
    bookmarkBook: (state, { payload: postId }: PayloadAction<string>) => {
      if (state.bookmarks.includes(postId)) {
        state.bookmarks = state.bookmarks.filter((id) => id !== postId);
      } else {
        state.bookmarks.push(postId);
      }
      Storage.set("bookmarks", state.bookmarks);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBooks.pending, (state) => {
      state.loading = true;
      state.error = undefined;
      state.data = [];
    });
    builder.addCase(fetchBooks.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
    builder.addCase(fetchBooks.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.data = payload.data;
      state.total = payload.total;
    });
  },
});

export const booksReducer = booksSlice.reducer;
export const booksActions = {
  ...booksSlice.actions,
  fetchBooks,
};
