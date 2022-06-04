import React from "react";
import { Link, NavLink } from "react-router-dom";
import useTranslate from "../hooks/useTranslate";

import { ReactComponent as LogoIcon } from "../../assets/logo.svg";
import { ReactComponent as LoginIcon } from "../../assets/login.svg";
import { ReactComponent as LogoutIcon } from "../../assets/logout.svg";

import "./Header.scss";
import Username from "./username/Username";
import { useSelector } from "../hooks/useSelector";
import { useActions } from "../hooks/useActions";

/* const LINKS = [
  { url: "/login", text: "Login" },
  { url: "/newbooks", text: "New Books" },
  { url: "/books", text: "Search Books" },
  { url: "/selectednewbooks", text: "Selected New Books" },
]; */

const Header: React.FC = () => {
  const { translate } = useTranslate();
  const { lang, setLang } = useTranslate();
  const logged = useSelector((state) => state.auth.logged);
  const { logout } = useActions();

  const LINKS = [
    { url: "/login", text: `${translate("login")}` },
    { url: "/newbooks", text: `${translate("new books")}` },
    { url: "/books", text: `${translate("search books")}` },
    { url: "/selectednewbooks", text: `${translate("selected books")}` },
  ];

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="header-container">
      <div className="logo">
        {/* <LogoIcon /> */}
        <div className="app-name">{translate("bookstore")}</div>
      </div>

      <ul className="links">
        {LINKS.map(({ url, text }) => (
          <li key={url + text}>
            <NavLink to={url} className={({ isActive }) => (isActive ? "_active" : "")}>
              {text}
            </NavLink>
          </li>
        ))}
      </ul>

      <div className="controls">
        {logged ? (
          <>
            <Username />
            <LogoutIcon className="icon-button logout-button" onClick={handleLogout} />
          </>
        ) : (
          <Link to="/login">
            <LoginIcon className="icon-button logout-button" onClick={handleLogout} />
          </Link>
        )}

        {lang === "en" ? (
          <button onClick={() => setLang("ru")}>ru</button>
        ) : (
          <button onClick={() => setLang("en")}>en</button>
        )}
      </div>
    </nav>
  );
};

export default Header;
