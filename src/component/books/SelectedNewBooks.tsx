import React, { useEffect, useState } from "react";
import { useActions } from "../hooks/useActions";
import { useSelector } from "../hooks/useSelector";
import BooksCard from "./card/BooksCard";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { BooksGrade } from "../../enums/booksGrade";
import NewBooksCard from "./card/NewBooksCard";

enum Mode {
  LIKED,
  DISLIKED,
  BOOKMARKED,
}

const SelectedNewBooks: React.FC = () => {
  const [mode, setMode] = useState(Mode.LIKED);

  const { fetchSelectedNewBooks } = useActions();
  const data = useSelector((state) => state.newBooks.data);
  const loading = useSelector((state) => state.newBooks.loading);
  const error = useSelector((state) => state.newBooks.error);

  const grades = useSelector((state) => state.newBooks.grades);

  const bookmarks = useSelector((state) => state.newBooks.bookmarks);

  const filteredData = data.filter((item) => {
    if (mode === Mode.LIKED) {
      return grades[item.isbn13] === BooksGrade.like;
    } else if (mode === Mode.DISLIKED) {
      return grades[item.isbn13] === BooksGrade.dislike;
    } else if (mode === Mode.BOOKMARKED) {
      return bookmarks.includes(item.isbn13);
    }
    return false;
  });

  useEffect(() => {
    fetchSelectedNewBooks();
  }, []);

  const handleToggleMode = (_: React.MouseEvent<HTMLElement>, newMode: Mode) => {
    setMode(newMode);
  };

  return (
    <div className="books-wrap">
      <ToggleButtonGroup value={mode} exclusive onChange={handleToggleMode}>
        <ToggleButton value={Mode.LIKED}>Liked</ToggleButton>
        <ToggleButton value={Mode.DISLIKED}>Disliked</ToggleButton>
        <ToggleButton value={Mode.BOOKMARKED}>Bookmarked</ToggleButton>
      </ToggleButtonGroup>
      <div className="books-container">
        {filteredData.map((item) => (
          <NewBooksCard key={item.isbn13} data={item} />
        ))}
      </div>
      {loading && "Loading..."}
      {error}
    </div>
  );
};

export default SelectedNewBooks;
