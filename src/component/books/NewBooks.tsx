import React, { useState } from "react";
import { MenuItem, Pagination, Select, SelectChangeEvent } from "@mui/material";
import useNewBooks from "../../apiHooks/useNewBooks";
import NewBooksCard from "./card/NewBooksCard";
import BooksFilterType from "../../types/BooksFilterType";
import NewBooksFilter from "./NewBooksFilter";

import "./Books.scss";

type PropsType = {};

const NewBooks: React.FC<PropsType> = () => {
  //const [page, setPage] = useState(1);
  // const [limit, setLimit] = useState(10);
  const [filter, setFilter] = useState<BooksFilterType>({
    page: 1,
    limit: 10,
  });
  const { data, loading, error } = useNewBooks();

  //const handleChangeLimit = (event: SelectChangeEvent) => {
  //  setLimit(+event.target.value);
  //  setPage(1);
  //};

  return (
    <div className="books-wrap">
      <div>
        <NewBooksFilter total={data.total} filter={filter} setFilter={setFilter} />
      </div>

      <div className="books-container">
        {data.books
          .map((item) => <NewBooksCard key={item.isbn13} data={item} />)
          .slice(filter.limit * (filter.page - 1), filter.limit * filter.page)}

        {loading && "Loading..."}
        {error && "Error :-("}
      </div>
    </div>
  );
};

export default NewBooks;
