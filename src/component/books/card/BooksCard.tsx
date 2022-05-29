import React from "react";
import { Link } from "react-router-dom";
import BooksType from "../../../types/booksType";
import Image from "../../image/Image";
import "./BooksCard.scss";
import { IconButton } from "@mui/material";
import { ReactComponent as LikeIcon } from "../../../assets/like.svg";
import { ReactComponent as DislikeIcon } from "../../../assets/dislike.svg";
import { useActions } from "../../hooks/useActions";
import { useSelector } from "../../hooks/useSelector";
import { BooksGrade } from "../../../enums/booksGrade";

type PropsType = {
  data: BooksType;
};

const BooksCard: React.FC<PropsType> = ({ data }) => {
  const { likePost, dislikePost } = useActions();

  const grades = useSelector((state) => state.books.grades);
  const isLiked = grades[data.isbn13] === BooksGrade.like;
  const isDisliked = grades[data.isbn13] === BooksGrade.dislike;

  const handleClickLike = () => {
    likePost(data.isbn13);
  };
  const handleClickDislike = () => {
    dislikePost(data.isbn13);
  };
  return (
    <div className="book-card-container">
      <Image src={data.image} />

      <Link to={`/books/${data.isbn13}`}>
        <div className="title">{data.title}</div>
      </Link>

      <div className="price">{data.price}</div>

      <div className="likes-wrap">
        <IconButton onClick={handleClickLike}>
          <LikeIcon className={`icon ${isLiked ? "_liked" : ""}`} />
        </IconButton>
        <IconButton onClick={handleClickDislike}>
          <DislikeIcon className={`icon ${isDisliked ? "_disliked" : ""}`} />
        </IconButton>
      </div>
    </div>
  );
};

export default BooksCard;
