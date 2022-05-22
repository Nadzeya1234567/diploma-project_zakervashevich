import React, { useEffect, useState } from "react";
import BooksCard from "./card/BooksCard";
import useBooks from "../../apiHooks/useBooks";
import BooksFilter from "./BooksFilter";
import BooksFilterType from "../../types/BooksFilterType";

import "./Books.scss";

type PropsType = {};

const Books: React.FC<PropsType> = () => {
  const [filter, setFilter] = useState<BooksFilterType>({
    page: 1,
    limit: 10,
  });
  const { data, loading, error } = useBooks(filter);

  return (
    <div className="books-wrap">
      <BooksFilter total={data.total} filter={filter} setFilter={setFilter} />

      <div className="books-container">
        {data.books.map((item) => (
          <BooksCard key={item.isbn13} data={item} />
        ))}
        {loading && "Loading..."}
        {error && "Error :-("}
      </div>
    </div>
  );
};

export default Books;
