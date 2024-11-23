import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { UserContext } from "../../user/context/UserContext";
import { useTranslation } from "react-i18next";
import NavbarLanguage from "./NavbarLanguage";

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const { isLoggedIn, logout } = useContext(UserContext);
  const [isClosed, setIsClosed] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [selectedView, setSelectedView] = useState("/");

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setSelectedLanguage(lng);
  };

  const openNavbar = () => {
    setIsClosed(false);
  };

  const toggleNavbarAndOptions = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsClosed(!isClosed);
  };

  const handleOptionClick = (view) => {
    setSelectedView(view);
    setIsClosed(true);
  };

  return (
    <div className={`sidebar ${isClosed ? "navbar-closed" : "navbar-open"}`}>
      <div className={`logo-class ${isClosed ? "logo-class-closed" : ""}`}>
        <div className={`logo-class ${isClosed ? "logo-class-closed" : ""}`}>
          <Link
            to="/"
            className="navbar-brand"
            onClick={() => handleOptionClick("/")}
          >
            {isClosed ? (
              <p className="vertical-logo">
                  HOLOGRAMA
              </p>
            ) : (
              <p className="text-logo">
                HOLOGRAMA
              </p>
            )}
          </Link>
        </div>
      </div>
      <div
        className={`art-options ${isClosed ? "art-options-closed" : ""}`}
        id="artOptions"
      >
        {!isLoggedIn() && (
          <>
            <Link
              to="/login"
              className={`nav-link ${
                selectedView === "/login" ? "selected" : ""
              }`}
              onClick={() => handleOptionClick("/login")}
            >
              {t("signIn")}
            </Link>
          </>
        )}
        <Link
          to="/magazine"
          className={`nav-link ${
            selectedView === "/magazine" ? "selected" : ""
          }`}
          onClick={() => handleOptionClick("/magazine")}
        >
          {t("magazine")}
        </Link>
        <Link
          to="/creatives"
          className={`nav-link ${
            selectedView === "/creatives" ? "selected" : ""
          }`}
          onClick={() => handleOptionClick("/creatives")}
        >
          {t("creatives")}
        </Link>
        <Link
          to="/interactives-list"
          className={`nav-link ${
            selectedView === "/interactives-list" ? "selected" : ""
          }`}
          onClick={() => handleOptionClick("/interactives-list")}
        >
          {t("SketchList")}
        </Link>
        {isLoggedIn() && (
          <Link
            to="/profile"
            className={`nav-link ${
              selectedView === "/profile" ? "selected" : ""
            }`}
            onClick={() => handleOptionClick("/profile")}
          >
            {t("profile")}
          </Link>
        )}
        {isLoggedIn() && (
          <Link
            to="/"
            className="nav-link"
            onClick={() => {
              logout();
              handleOptionClick("/");
            }}
          >
            {t("logout")}
          </Link>
        )}
      </div>
      <NavbarLanguage
        isClosed={isClosed}
        selectedLanguage={selectedLanguage}
        changeLanguage={changeLanguage}
        toggleNavbarAndOptions={toggleNavbarAndOptions}
        openNavbar={openNavbar}
      />
    </div>
  );
};

export default Navbar;
