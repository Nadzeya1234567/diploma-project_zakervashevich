import React from "react";
import { Link } from "react-router-dom";
import BooksType from "../../../types/booksType";
import Image from "../../image/Image";
import { IconButton } from "@mui/material";
import { ReactComponent as LikeIcon } from "../../../assets/like.svg";
import { ReactComponent as DislikeIcon } from "../../../assets/dislike.svg";
import { ReactComponent as BookmarkIcon } from "../../../assets/bookmark.svg";
import { useActions } from "../../hooks/useActions";
import { useSelector } from "../../hooks/useSelector";
import { BooksGrade } from "../../../enums/booksGrade";

import "./BooksCard.scss";

type PropsType = {
  data: BooksType;
};

const NewBooksCard: React.FC<PropsType> = ({ data }) => {
  const { likeNewBook, dislikeNewBook, bookmarkNewBook } = useActions();

  const grades = useSelector((state) => state.newBooks.grades);
  const isLiked = grades[data.isbn13] === BooksGrade.like;
  const isDisliked = grades[data.isbn13] === BooksGrade.dislike;

  const bookmarks = useSelector((state) => state.newBooks.bookmarks);
  const isBookmarked = bookmarks.includes(data.isbn13);

  const handleClickLike = () => {
    likeNewBook(data.isbn13);
  };
  const handleClickDislike = () => {
    dislikeNewBook(data.isbn13);
  };
  const handleClickBookmark = () => {
    bookmarkNewBook(data.isbn13);
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
        <IconButton onClick={handleClickBookmark}>
          <BookmarkIcon className={`icon ${isBookmarked ? "_bookmarked" : ""}`} />
        </IconButton>
      </div>
    </div>
  );
};

export default NewBooksCard;
