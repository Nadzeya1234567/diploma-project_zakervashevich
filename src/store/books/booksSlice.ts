import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import BooksType from "../../types/booksType";
import { fetchBooks } from "./booksThunks";

type StoreType = {
  data: BooksType[];
  total: string;
  loading: boolean;
  error?: string;
  likes: string[];
  dislikes: string[];
};

const initialState: StoreType = {
  data: [],
  total: "0",
  loading: false,
  likes: [],
  dislikes: [],
};

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    likePost: (state, { payload }: PayloadAction<string>) => {
      if (!state.likes.includes(payload)) {
        state.likes.push(payload);
        state.dislikes = state.dislikes.filter((id) => id !== payload);
      } else {
        state.likes = state.likes.filter((id) => id !== payload);
      }
    },
    dislikePost: (state, { payload }: PayloadAction<string>) => {
      if (!state.dislikes.includes(payload)) {
        state.dislikes.push(payload);
        state.likes = state.likes.filter((id) => id !== payload);
      } else {
        state.dislikes = state.dislikes.filter((id) => id !== payload);
      }
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
