import React, { useEffect, useState } from "react";
import BooksType from "../../types/booksType";
import BooksCard from "./card/NewBooksCard";

import "./Books.scss";

type PropsType = {};

const URL = "https://api.itbook.store/1.0";

const NewBooks: React.FC<PropsType> = () => {
  const [books, setBooks] = useState<BooksType[]>([]);
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
    fetch(`${URL}/new`)
      .then((response) => response.json())
      .then((data) => {
        const books = data.books as BooksType[];
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
