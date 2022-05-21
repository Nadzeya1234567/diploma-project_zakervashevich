import BooksType from "../types/booksType";
import BooksFilterType from "../types/BooksFilterType";
import useRequest from "./useRequest";
import { useState } from "react";

const URL = "https://api.itbook.store/1.0/search";

type ResponseType = {
  total: number;
  books: BooksType[];
};

const defValue: ResponseType = {
  total: 0,
  books: [],
};
const useBooks = ({ page, limit, search }: BooksFilterType) => {
  const url = `${URL}/${search}/${page}`;

  const { data, loading, error } = useRequest<ResponseType>(defValue, url);

  return { data, loading, error };
};

export default useBooks;
