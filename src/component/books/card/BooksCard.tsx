import React from "react";
import BookType from "../../../types/bookType";
import Image from "../../image/Image";
import "./BooksCard.scss";

type PropsType = {
  data: BookType;
};

const BooksCard: React.FC<PropsType> = ({ data }) => {
  return (
    <div className="book-card-container">
      <Image src={data.image} />
      <div className="title">{data.title}</div>
      <div className="price">{data.price}</div>
    </div>
  );
};

export default BooksCard;
