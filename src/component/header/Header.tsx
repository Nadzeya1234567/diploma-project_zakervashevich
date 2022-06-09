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
import { Button } from "@mui/material";

const Header: React.FC = () => {
  const { translate } = useTranslate();
  const { lang, setLang } = useTranslate();
  const logged = useSelector((state) => state.auth.logged);
  const { logout } = useActions();

  const getLinks = (logged: boolean) => [
    { url: "/newbooks", text: `${translate("new books")}` },
    { url: "/books", text: `${translate("search books")}` },
    ...(!logged ? [] : [{ url: "/selectednewbooks", text: `${translate("selected books")}` }]),
  ];
  const LINKS = getLinks(logged);

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="header-container">
      <div className="header-wrap">
        <div className="logo">
          {<LogoIcon className="logo-icon" />}
          <div className="app-name">{translate("bookstore")}</div>
        </div>

        <nav className="header-navigation">
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
            <Button variant="contained" color="secondary" size="small" onClick={() => setLang("ru")}>
              ru
            </Button>
          ) : (
            <Button variant="contained" color="secondary" size="small" onClick={() => setLang("en")}>
              en
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
