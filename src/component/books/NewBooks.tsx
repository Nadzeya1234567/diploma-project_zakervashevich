import React, { useEffect, useState } from "react";
import BooksFilterType from "../../types/BooksFilterType";
import NewBooksFilter from "./NewBooksFilter";
import { useSelector } from "../hooks/useSelector";
import { useActions } from "../hooks/useActions";

import "./Books.scss";
import BooksCard from "./card/BooksCard";

type PropsType = {};

const NewBooks: React.FC<PropsType> = () => {
  const { fetchNewBooks } = useActions();
  const [filter, setFilter] = useState<BooksFilterType>({
    page: 1,
    limit: 10,
  });

  const data = useSelector((state) => state.newBooks.data);
  const loading = useSelector((state) => state.newBooks.loading);
  const error = useSelector((state) => state.newBooks.error);
  const total = useSelector((state) => state.newBooks.total);

  useEffect(() => {
    fetchNewBooks(filter);
  }, [filter]);

  return (
    <div className="books-wrap">
      <div>
        <NewBooksFilter total={total} filter={filter} setFilter={setFilter} />
      </div>

      <div className="books-container">
        {data
          .map((item) => <BooksCard key={item.isbn13} data={item} />)
          .slice(filter.limit * (filter.page - 1), filter.limit * filter.page)}

        {loading && "Loading..."}
        {error}
      </div>
    </div>
  );
};

export default NewBooks;
