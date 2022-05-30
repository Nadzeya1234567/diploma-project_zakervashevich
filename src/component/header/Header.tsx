import React from "react";
import { NavLink } from "react-router-dom";
import useTranslate from "../hooks/useTranslate";

import { ReactComponent as LogoIcon } from "../../assets/logo.svg";

import "./Header.scss";

/* const LINKS = [
  { url: "/login", text: "Login" },
  { url: "/newbooks", text: "New Books" },
  { url: "/books", text: "Search Books" },
  { url: "/selectednewbooks", text: "Selected New Books" },
]; */

const Header: React.FC = () => {
  const { translate } = useTranslate();
  const { lang, setLang } = useTranslate();

  const LINKS = [
    { url: "/login", text: `${translate("login")}` },
    { url: "/newbooks", text: `${translate("new books")}` },
    { url: "/books", text: `${translate("search books")}` },
    { url: "/selectednewbooks", text: `${translate("selected books")}` },
  ];

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
      <div>
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
