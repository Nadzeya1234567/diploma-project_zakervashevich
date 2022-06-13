import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import BooksFilterType from "../../types/BooksFilterType";
import BooksType from "../../types/booksType";

const URL = "https://api.itbook.store/1.0";

type FetchBooksType = {
  data: BooksType[];
  total: string;
};

export const fetchBooks = createAsyncThunk<FetchBooksType, BooksFilterType, { rejectValue: string }>(
  "books/fetchBooks",
  async ({ page, search }, thunkApi) => {
    const url = `${URL}/search/${search}/${page}`;

    try {
      const response = await axios.get(url);

      return {
        data: response.data.books as BooksType[],
        total: response.data.total as string,
      };
    } catch {
      return thunkApi.rejectWithValue("Server error!!!");
    }
  }
);
