import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BooksGrade } from "../../enums/booksGrade";
import BooksType from "../../types/booksType";
import { fetchBooks } from "./booksThunks";

const getGradesFromStorage = (): GradesType => {
  try {
    return JSON.parse(localStorage.getItem("grades") || "") as GradesType;
  } catch {
    return {};
  }
};

const setGradesToStorage = (data: GradesType) => {
  try {
    localStorage.setItem("grades", JSON.stringify(data));
  } catch {}
};

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
};

const initialState: StoreType = {
  data: [],
  total: "0",
  loading: false,
  grades: getGradesFromStorage(),
};

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    likePost: (state, { payload }: PayloadAction<string>) => {
      if (state.grades[payload] === BooksGrade.like) {
        delete state.grades[payload];
      } else {
        state.grades[payload] = BooksGrade.like;
      }

      setGradesToStorage(state.grades);
    },
    dislikePost: (state, { payload }: PayloadAction<string>) => {
      if (state.grades[payload] === BooksGrade.dislike) {
        delete state.grades[payload];
      } else {
        state.grades[payload] = BooksGrade.dislike;
      }
      setGradesToStorage(state.grades);
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
