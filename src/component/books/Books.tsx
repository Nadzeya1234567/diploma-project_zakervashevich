import React, { useEffect, useState } from "react";
import BooksCard from "./card/BooksCard";
import BooksFilter from "./BooksFilter";
import BooksFilterType from "../../types/BooksFilterType";
import { useSelector } from "../hooks/useSelector";
import { useActions } from "../hooks/useActions";

import "./Books.scss";

type PropsType = {};

const Books: React.FC<PropsType> = () => {
  const { fetchBooks } = useActions();
  const [filter, setFilter] = useState<BooksFilterType>({
    page: 1,
    limit: 10,
  });

  const data = useSelector((state) => state.books.data);
  const loading = useSelector((state) => state.books.loading);
  const error = useSelector((state) => state.books.error);
  const total = useSelector((state) => state.books.total);

  useEffect(() => {
    if (filter.search) {
      fetchBooks(filter);
    }
  }, [filter]);

  return (
    <div className="books-wrap">
      <BooksFilter total={total} filter={filter} setFilter={setFilter} />

      <div className="books-container">
        {data.map((item) => (
          <BooksCard key={item.isbn13} data={item} />
        ))}
        {loading && "Loading..."}
        {error}
      </div>
    </div>
  );
};

export default Books;
