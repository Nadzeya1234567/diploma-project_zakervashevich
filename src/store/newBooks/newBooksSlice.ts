import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import BooksType from "../../types/booksType";
import { fetchNewBooks, fetchSelectedNewBooks } from "./newBooksThunks";
import { BooksGrade } from "../../enums/booksGrade";
import Storage from "../../helpers/Storage";

type GradesType = {
  [prop: string]: BooksGrade;
};

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

const newBooksSlice = createSlice({
  name: "newBooks",
  initialState,
  reducers: {
    likeNewBook: (state, { payload: postId }: PayloadAction<string>) => {
      if (state.grades[postId] === BooksGrade.like) {
        delete state.grades[postId];
      } else {
        state.grades[postId] = BooksGrade.like;
      }

      Storage.set("grades", state.grades);
    },
    dislikeNewBook: (state, { payload: postId }: PayloadAction<string>) => {
      if (state.grades[postId] === BooksGrade.dislike) {
        delete state.grades[postId];
      } else {
        state.grades[postId] = BooksGrade.dislike;
      }
      Storage.set("grades", state.grades);
    },
    bookmarkNewBook: (state, { payload: postId }: PayloadAction<string>) => {
      if (state.bookmarks.includes(postId)) {
        state.bookmarks = state.bookmarks.filter((id) => id !== postId);
      } else {
        state.bookmarks.push(postId);
      }
      Storage.set("bookmarks", state.bookmarks);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchNewBooks.pending, (state) => {
      state.loading = true;
      state.error = undefined;
      state.data = [];
    });
    builder.addCase(fetchNewBooks.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
    builder.addCase(fetchNewBooks.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.data = payload.data;
      state.total = payload.total;
    });

    builder.addCase(fetchSelectedNewBooks.pending, (state) => {
      state.loading = true;
      state.error = undefined;
      state.data = [];
    });
    builder.addCase(fetchSelectedNewBooks.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
    builder.addCase(fetchSelectedNewBooks.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.data = payload.data;
      state.total = payload.total;
    });
  },
});

export const newBooksReducer = newBooksSlice.reducer;
export const newBooksActions = {
  ...newBooksSlice.actions,
  fetchNewBooks,
  fetchSelectedNewBooks,
};
