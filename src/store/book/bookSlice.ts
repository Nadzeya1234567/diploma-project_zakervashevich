import { createSlice } from "@reduxjs/toolkit";
import BooksType from "../../types/booksType";
import { fetchBook } from "./bookThunks";

type StoreType = {
  data?: BooksType;
  loading: boolean;
  error?: string;
};

const initialState: StoreType = {
  data: undefined,
  loading: false,
};

const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBook.pending, (state) => {
      state.loading = true;
      state.error = undefined;
    });
    builder.addCase(fetchBook.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
    builder.addCase(fetchBook.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.data = payload.data;
    });
  },
});

export const bookReducer = bookSlice.reducer;
export const bookActions = {
  ...bookSlice.actions,
  fetchBook,
};
