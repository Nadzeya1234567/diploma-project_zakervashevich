import BooksType from "../types/booksType";
import BooksFilterType from "../types/BooksFilterType";
import useRequest from "./useRequest";

const URL = "https://api.itbook.store/1.0";

type ResponseType = {
  total: number;
  books: BooksType[];
};

const defValue: ResponseType = {
  total: 0,
  books: [],
};
const useNewBooks = ({ page, search }: BooksFilterType) => {
  const url = `${URL}/new`;

  const { data, loading, error } = useRequest<ResponseType>(defValue, url);

  return { data, loading, error };
};

export default useNewBooks;
