import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Image from "../image/Image";
import Rating from "@mui/material/Rating";
import { useSelector } from "../hooks/useSelector";
import { useActions } from "../hooks/useActions";

import "./BookPage.scss";

const URL = "https://api.itbook.store/1.0";

const BookPage: React.FC = () => {
  const { isbn13 } = useParams();

  const { fetchBook } = useActions();

  const data = useSelector((state) => state.book.data);
  const loading = useSelector((state) => state.book.loading);
  const error = useSelector((state) => state.book.error);

  useEffect(() => {
    fetchBook(isbn13);
  }, [isbn13]);

  if (loading) {
    return <div>Loading...</div>;
  } else if (error) {
    return <div>Error...</div>;
  }

  if (!data) {
    return null;
  }

  return (
    <div className="bookpage-container">
      <div className="bookpage__image">
        <Image src={data?.image} />
      </div>
      <div>
        <div className="title">{data?.title}</div>
        <div className="subtitle">{data?.subtitle}</div>
        <div className="book-details-wrap">
          <div className="authors">Authors: {data?.authors}</div>
          <div className="publisher">Publisher: {data?.publisher}</div>
          <div className="description">{data?.desc}</div>
          <div className="pages">Pages: {data?.pages} </div>
          <div className="year">Year: {data?.year}</div>
          <div className="rating">
            <Rating name="read-only" value={Number(data?.rating)} readOnly />
          </div>
          <div className="price">Price: {data?.price}</div>
        </div>
      </div>
    </div>
  );
};

export default BookPage;
