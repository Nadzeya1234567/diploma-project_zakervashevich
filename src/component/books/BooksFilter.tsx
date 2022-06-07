import React from "react";
import Pagination from "@mui/material/Pagination";
import BooksFilterType from "../../types/BooksFilterType";
import TextField from "../ui/textField/TextField";

import "./Books.scss";

type PropsType = {
  total: string;
  filter: BooksFilterType;
  setFilter: (callback: (v: BooksFilterType) => BooksFilterType) => void;
};

const BooksFilter: React.FC<PropsType> = ({ total, filter, setFilter }) => {
  const setSearchBooks = (value: string) => {
    const search = value !== "" ? value : undefined;
    setFilter((prevValue) => ({
      ...prevValue,
      search,
    }));
  };

  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setFilter((prevValue) => ({
      ...prevValue,
      page: value,
    }));
  };

  return (
    <div className="filter-container">
      <TextField
        label="Search books"
        placeholder="Search books"
        value={filter.search?.toString()}
        setValue={setSearchBooks}
      />

      <Pagination
        page={filter.page}
        onChange={handleChangePage}
        count={Math.ceil(Number(total) / filter.limit)}
        variant="outlined"
        shape="rounded"
        color="secondary"
      />
    </div>
  );
};

export default BooksFilter;
