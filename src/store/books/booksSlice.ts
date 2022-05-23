import { createSlice } from "@reduxjs/toolkit";
import BooksType from "../../types/booksType";
import { fetchBooks } from "./booksThunks";

type StoreType = {
  data: BooksType[];
  total: number;
  loading: boolean;
  error?: string;
};

const initialState: StoreType = {
  data: [],
  total: 0,
  loading: false,
};

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {},
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
