import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import BooksType from "../../types/booksType";
import BooksCard from "../books/card/NewBooksCard";
import Image from "../image/Image";

import "./BookPage.scss";

const URL = "https://api.itbook.store/1.0";

const BookPage: React.FC = () => {
  const [book, setBook] = useState<BooksType>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { isbn13 } = useParams();

  const x = useLocation();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setLoading(true);
    setTimeout(() => {
      fetch(`${URL}/books/${isbn13}`)
        .then((response) => response.json())
        .then((data) => {
          const book = data as BooksType;
          setBook(book);
        })
        .catch(() => {
          setError(true);
        })
        .finally(() => {
          setLoading(false);
        });
    }, 0);
  };

  if (loading) {
    return <div>Loading...</div>;
  } else if (error) {
    return <div>Error...</div>;
  }

  if (!book) {
    return null;
  }

  return (
    <div className="book-card-container">
      <Image src={book.image} />

      <div className="title">{book.title}</div>
      <div className="subtitle">{book.subtitle}</div>
      <div className="price">{book.price}</div>
      <div className="url">{book.url}</div>
    </div>
  );
};

export default BookPage;
