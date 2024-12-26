import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
// import { UserContext } from "../../user/context/UserContext";
import { useTranslation } from "react-i18next";
import NavbarLanguage from "./NavbarLanguage";
import { RiExpandRightLine } from "../../../../node_modules/react-icons/ri";
import { MdExpandMore } from "../../../../node_modules/react-icons/md";
import { RiCloseLargeLine } from "../../../../node_modules/react-icons/ri";
import { UserAuth } from "../../../AuthContext";

const Navbar = () => {
  const { t, i18n } = useTranslation();

  const { user, logout } = UserAuth();
  const [isClosed, setIsClosed] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [selectedView, setSelectedView] = useState("/");

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setSelectedLanguage(lng);
  };

  const handleSignOut = async () => {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
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
        {isClosed && (
          <button style={{ transform: "rotate(360deg)" }} onClick={openNavbar}>
            <MdExpandMore color="#040311" size={35} />
          </button>
        )}
        <button
          onClick={toggleNavbarAndOptions}
          className="navbar-brand"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
        >
          {isClosed ? (
            <p className="vertical-logo">Holograma</p>
          ) : (
            <p className="text-logo">Holograma</p>
          )}
        </button>
      </div>
      <div
        className={`art-options ${isClosed ? "art-options-closed" : ""}`}
        id="artOptions"
        style={isClosed ? { display: "none" } : null}
      >
        {user?.displayName ? (
          <button className="nav-link" onClick={handleSignOut}>
            Logout
          </button>
        ) : (
          <Link className="nav-link" to="/login">
            Login
          </Link>
        )}

        {/*  {!isLoggedIn() && (
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
         */}
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
      </div>
      {!isClosed && (
        <>
          <NavbarLanguage
            isClosed={isClosed}
            selectedLanguage={selectedLanguage}
            changeLanguage={changeLanguage}
            toggleNavbarAndOptions={toggleNavbarAndOptions}
            openNavbar={openNavbar}
          />
          <div className="button-close-container">
            <button
              style={{ transform: "rotate(180deg)" }}
              onClick={toggleNavbarAndOptions}
            >
              <RiCloseLargeLine color="#040311" size={35} />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;
