import BooksType from "../types/booksType";
import BooksFilterType from "../types/BooksFilterType";
import useRequest from "./useRequest";

const URL = "https://api.itbook.store/1.0";

type ResponseType = {
  total: string;
  books: BooksType[];
};

const defValue: ResponseType = {
  total: "0",
  books: [],
};
const useBooks = ({ page, search }: BooksFilterType) => {
  const url = `${URL}/search/${search}/${page}`;

  const { data, loading, error } = useRequest<ResponseType>(defValue, url);

  return { data, loading, error };
};

export default useBooks;
