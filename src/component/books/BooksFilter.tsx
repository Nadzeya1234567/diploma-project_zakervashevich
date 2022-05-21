import React from "react";
import Pagination from "@mui/material/Pagination";
import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import BooksFilterType from "../../types/BooksFilterType";
import TextField from "../ui/textField/TextField";

import "./Books.scss";

type PropsType = {
  total: number;
  //query: "";
  //limit: number;
  filter: BooksFilterType;
  setFilter: (callback: (v: BooksFilterType) => BooksFilterType) => void;
};

const BooksFilter: React.FC<PropsType> = ({ total, filter, setFilter }) => {
  const setSearchBooks = (value: string) => {
    //console.log(search);
    const search = value !== "" ? value : "";
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
    <div className="posts-container">
      <TextField label="Search books" value={filter.search?.toString()} setValue={setSearchBooks} />

      <Select label="Items per page" value={filter.limit.toString()} onChange={handleChangeLimit}>
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </Select>

      <Pagination className="pagination" page={filter.page} onChange={handleChangePage} count={Math.ceil(total / 10)} />
    </div>
  );
};

export default BooksFilter;
