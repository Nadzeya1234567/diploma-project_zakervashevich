import axios from "axios";
import React, { useEffect, useState } from "react";
import BookType from "../../types/bookType";
import BooksCard from "./card/BooksCard";

import "./NewBooks.scss";

type PropsType = {};

const URL = "https://api.itbook.store/1.0/new";

const NewBooks: React.FC<PropsType> = () => {
  const [books, setBooks] = useState<BookType[]>([]);
  //мы должны явно указать тип массива,т.к.ts не понимает
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    console.log(books);
  }, [books]);

  useEffect(() => {
    setLoading(true);
    setTimeout(fetchData, 1000);
  }, []);

  const fetchData = () => {
    fetch(URL)
      .then((response) => response.json())
      .then((data) => {
        const books = data.books as BookType[];
        setBooks(books);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="books-container">
      {books.map((item) => (
        <BooksCard key={item.isbn13} data={item} />
      ))}
      {loading && "Loading..."}
      {error && "Error :-("}
    </div>
  );
};

export default NewBooks;
