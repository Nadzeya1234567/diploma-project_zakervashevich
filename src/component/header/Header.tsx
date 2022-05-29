import React from "react";
import { NavLink } from "react-router-dom";

import { ReactComponent as LogoIcon } from "../../assets/logo.svg";

import "./Header.scss";

const LINKS = [
  { url: "/newbooks", text: "New Books" },
  { url: "/books", text: "Search Books" },
  { url: "/selectednewbooks", text: "Selected New Books" },
];

const Header: React.FC = () => {
  return (
    <nav className="header-container">
      <div className="logo">
        {/* <LogoIcon /> */}
        <div className="app-name">BookStore</div>
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
    </nav>
  );
};

export default Header;
