import React, { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Header from "./component/header/Header";
//import Login from "./component/login/Login";
//import Registration from "./component/registration/Registration";
//import PostPage from "./component/postPage/PostPage";

import "./App.css";

import AllBooks from "./component/books/AllBooks";
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
              <Route path="/allbooks">
                <Route index element={<AllBooks />} />
                <Route path=":isbn13" element={<BookPage />} />
              </Route>
              {/*  переадресация */}
              {/* <Route path="*" element={<Navigate to={"/newbooks"} />} /> */}
              {/*  <Route path="*" element={<Posts />} /> */}
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
