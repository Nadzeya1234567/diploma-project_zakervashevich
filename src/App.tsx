import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Books from "./component/books/Books";
import BookPage from "./component/bookPage/BookPage";
import NewBooks from "./component/books/NewBooks";
import SelectedNewBooks from "./component/books/SelectedNewBooks";
import Header from "./component/header/Header";

import "./App.css";
import Login from "./component/login/Login";
import { useSelector } from "./component/hooks/useSelector";

const App: React.FC = () => {
  const logged = useSelector((state) => state.auth.logged);
  return (
    <BrowserRouter>
      <div className="App">
        <div className="app-container">
          <Header />

          <div className="app-content">
            <Routes>
              {!logged && (
                <>
                  <Route path="/login/*" element={<Login />} />
                </>
              )}

              <Route path="/newbooks">
                <Route index element={<NewBooks />} />
                <Route path=":isbn13" element={<BookPage />} />
              </Route>
              <Route path="/books">
                <Route index element={<Books />} />
                <Route path=":isbn13" element={<BookPage />} />
              </Route>

              {logged && (
                <>
                  <Route path="/selectednewbooks">
                    <Route index element={<SelectedNewBooks />} />
                    <Route path=":isbn13" element={<BookPage />} />
                  </Route>
                </>
              )}
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
