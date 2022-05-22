import React, { useEffect, useState } from "react";

import NewBooksFilter from "./NewBooksFilter";
import BooksFilterType from "../../types/BooksFilterType";
import useNewBooks from "../../apiHooks/useNewBooks";
import NewBooksCard from "./card/NewBooksCard";

import "./Books.scss";

type PropsType = {};

const NewBooks: React.FC<PropsType> = () => {
  const [filter, setFilter] = useState<BooksFilterType>({
    page: 1,
    limit: 10,
  });
  const { data, loading, error } = useNewBooks(filter);

  return (
    <div className="books-container">
      <NewBooksFilter total={data.total} filter={filter} setFilter={setFilter} />

      {data.books.map((item) => (
        <NewBooksCard key={item.isbn13} data={item} />
      ))}
      {loading && "Loading..."}
      {error && "Error :-("}
    </div>
  );
};

export default NewBooks;
