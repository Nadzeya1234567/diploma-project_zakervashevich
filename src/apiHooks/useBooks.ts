import BooksType from "../types/booksType";
import BooksFilterType from "../types/BooksFilterType";
import useRequest from "./useRequest";

const URL = "https://api.itbook.store/1.0/search";

type ResponseType = {
  total: number;
  books: BooksType[];
};

const defValue: ResponseType = {
  total: 0,
  books: [],
};
const useBooks = ({ page, limit }: BooksFilterType) => {
  const url = `${URL}/the/${page}`;
  const { data, loading, error } = useRequest<ResponseType>(defValue, url);

  return { data, loading, error };
};

export default useBooks;
