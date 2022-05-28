import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import BooksFilterType from "../../types/BooksFilterType";

import BooksType from "../../types/booksType";

const URL = "https://api.itbook.store/1.0";

type FetchBookType = {
  data?: BooksType;
};

export const fetchBook = createAsyncThunk<FetchBookType, string, { rejectValue: string }>(
  "book/fetchBook",
  async (id, thunkApi) => {
    const url = `${URL}/books/${id}`;

    try {
      const response = await axios.get(url);
      console.log(response);
      return {
        data: response.data as BooksType,
      };
    } catch {
      return thunkApi.rejectWithValue("Server error!!!");
    }
  }
);
