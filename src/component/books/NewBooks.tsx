import React, { useEffect, useState } from "react";
import { listItemTextClasses, MenuItem, Pagination, Select, SelectChangeEvent } from "@mui/material";
import useNewBooks from "../../apiHooks/useNewBooks";
import NewBooksCard from "./card/NewBooksCard";

import "./Books.scss";

type PropsType = {};

const NewBooks: React.FC<PropsType> = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { data, loading, error } = useNewBooks();

  const handleChangeLimit = (event: SelectChangeEvent) => {
    setLimit(+event.target.value);
    setPage(1);
  };

  return (
    <div className="books-wrap">
      <div className="pagination">
        <Pagination count={data.total / limit} page={page} onChange={(event, value: number) => setPage(value)} />
        <Select label="Items per page" value={limit?.toString()} onChange={handleChangeLimit}>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
        </Select>
      </div>

      <div className="books-container">
        {data.books
          .map((item) => <NewBooksCard key={item.isbn13} data={item} />)
          .slice(limit * (page - 1), limit * page)}

        {loading && "Loading..."}
        {error && "Error :-("}
      </div>
    </div>
  );
};

export default NewBooks;
