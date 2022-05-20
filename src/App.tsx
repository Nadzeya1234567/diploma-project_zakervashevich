import React, { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Header from "./component/header/Header";

import "./App.css";

import Books from "./component/books/Books";
import BookPage from "./component/bookPage/BookPage";
import NewBooks from "./component/books/NewBooks";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <div className="app-container">
          <Header />

          <div className="app-content">
            <Routes>
              <Route path="/newbooks">
                <Route index element={<NewBooks />} />
                <Route path=":isbn13" element={<BookPage />} />
              </Route>
              <Route path="/books">
                <Route index element={<Books />} />
                <Route path=":isbn13" element={<BookPage />} />
              </Route>
              {/*  переадресация */}
              <Route path="*" element={<Navigate to={"/books"} />} />
              <Route path="*" element={<Books />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
