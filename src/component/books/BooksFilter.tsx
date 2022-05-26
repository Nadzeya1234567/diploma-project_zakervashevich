import React from "react";
import Pagination from "@mui/material/Pagination";
import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
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
      <TextField label="Search books" value={filter.search?.toString()} setValue={setSearchBooks} />

      <Select
        className="select-search"
        label="Items per page"
        value={filter.limit.toString()}
        onChange={handleChangeLimit}
      >
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </Select>

      <Pagination page={filter.page} onChange={handleChangePage} count={Math.ceil(Number(total) / filter.limit)} />
    </div>
  );
};

export default BooksFilter;
