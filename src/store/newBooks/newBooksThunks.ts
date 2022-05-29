import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import BooksFilterType from "../../types/BooksFilterType";
import BooksType from "../../types/booksType";

const URL = "https://api.itbook.store/1.0";

type FetchBooksType = {
  data: BooksType[];
  total: string;
};

export const fetchNewBooks = createAsyncThunk<FetchBooksType, BooksFilterType, { rejectValue: string }>(
  "newBooks/fetchNewBooks",
  async ({}, thunkApi) => {
    const url = `${URL}/new`;

    try {
      const response = await axios.get(url);
      console.log(response);
      return {
        data: response.data.books as BooksType[],
        total: response.data.total as string,
      };
    } catch {
      return thunkApi.rejectWithValue("Server error!!!");
    }
  }
);

export const fetchSelectedNewBooks = createAsyncThunk<FetchBooksType, undefined, { rejectValue: string }>(
  "newBooks/fetchSelectedNewBooks",
  async (_, thunkApi) => {
    const url = `${URL}/new`;

    try {
      const response = await axios.get(url);
      console.log(response);
      return {
        data: response.data.books as BooksType[],
        total: response.data.total as string,
      };
    } catch {
      return thunkApi.rejectWithValue("Server error!!!");
    }
  }
);
