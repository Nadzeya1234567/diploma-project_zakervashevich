import { createSlice } from "@reduxjs/toolkit";
import BooksType from "../../types/booksType";
import { fetchNewBooks } from "./newBooksThunks";

type StoreType = {
  data: BooksType[];
  total: string;
  loading: boolean;
  error?: string;
};

const initialState: StoreType = {
  data: [],
  total: "0",
  loading: false,
};

const newBooksSlice = createSlice({
  name: "newBooks",
  initialState,
  reducers: {},
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
  },
});

export const newBooksReducer = newBooksSlice.reducer;
export const newBooksActions = {
  ...newBooksSlice.actions,
  fetchNewBooks,
};
