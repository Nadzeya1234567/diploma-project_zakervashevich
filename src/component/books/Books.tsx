import React, { useEffect, useState } from "react";
import BooksCard from "./card/BooksCard";
import useBooks from "../../apiHooks/useBooks";
import BooksFilter from "./BooksFilter";
import BooksFilterType from "../../types/BooksFilterType";

import "./Books.scss";

type PropsType = {};

//const URL = "https://api.itbook.store/1.0/search/mongodb";

const Books: React.FC<PropsType> = () => {
  const [filter, setFilter] = useState<BooksFilterType>({
    page: 1,
    limit: 10,
  });
  const { data, loading, error } = useBooks(filter);

  return (
    <div className="books-container">
      <BooksFilter total={data.total} filter={filter} setFilter={setFilter} />

      {data.books.map((item) => (
        <BooksCard key={item.isbn13} data={item} />
      ))}
      {loading && "Loading..."}
      {error && "Error :-("}
    </div>
  );
};

export default Books;
