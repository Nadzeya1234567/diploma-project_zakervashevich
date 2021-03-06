import React from "react";
import Pagination from "@mui/material/Pagination";
import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import BooksFilterType from "../../types/BooksFilterType";

import "./Books.scss";

type PropsType = {
  total: string;
  filter: BooksFilterType;
  setFilter: (callback: (v: BooksFilterType) => BooksFilterType) => void;
};

const NewBooksFilter: React.FC<PropsType> = ({ total, filter, setFilter }) => {
  const handleChangeLimit = (event: SelectChangeEvent) => {
    setFilter((prevValue) => ({
      ...prevValue,
      page: 1,
      limit: +event.target.value,
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
      <Select className="select" label="Items per page" value={filter.limit.toString()} onChange={handleChangeLimit}>
        <MenuItem value={10}>10</MenuItem>
        <MenuItem value={20}>20</MenuItem>
      </Select>

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

export default NewBooksFilter;
