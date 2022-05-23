import React from "react";
import { Link } from "react-router-dom";
import BooksType from "../../../types/booksType";
import Image from "../../image/Image";
import "./BooksCard.scss";

type PropsType = {
  data: BooksType;
};

const BooksCard: React.FC<PropsType> = ({ data }) => {
  return (
    <div className="book-card-container">
      <Image src={data.image} />

      <Link to={`/books/${data.isbn13}`}>
        <div className="title">{data.title}</div>
      </Link>
      <div className="price">{data.price}</div>
    </div>
  );
};

export default BooksCard;
