import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";
import { useTranslation } from "react-i18next";
import NavbarLanguage from "./NavbarLanguage";
import { MdExpandMore } from "../../../../node_modules/react-icons/md";
import { RiCloseFill } from "react-icons/ri";
import { UserAuth } from "../../../AuthContext";
import {
  FaCompass,
  FaPen,
  FaSignInAlt,
  FaBook,
  FaAdjust,
} from "react-icons/fa";

const Navbar = ({ setSkin, skin }) => {
  const { t, i18n } = useTranslation();
  const timeoutRef = useRef(null);

  const { user, logout } = UserAuth();
  const [isClosed, setIsClosed] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [selectedView, setSelectedView] = useState("/");
  const [logoVisible, setLogoVisible] = useState(true);
  const [showIcons, setShowIcons] = useState(false);

  const handleMouseIconsEnter = () => setShowIcons(true);
  const handleMouseIconsLeave = () => setShowIcons(false);

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setLogoVisible(false);
    } else {
      setLogoVisible(true);
    }
  };

  const handleMouseEnter = () => {
    if (!isPrint) {
      setLogoVisible(true);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (event.clientX <= 150) {
        // Si entra al área, cancelar cualquier timeout de ocultar
        clearTimeout(timeoutRef.current);
        setShowIcons(true);
      } else {
        // Si sale del área, esperar 2 segundos antes de ocultar
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
          setShowIcons(false);
        }, 2000); // 2000 milisegundos = 2 segundos
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(timeoutRef.current);
    };
  }, []);

  const location = useLocation();
  const isMagazine = location.pathname === "/magazine";
  const isFluid = location.pathname === "/fluid-component";
  const isPad = location.pathname === "/pad";
  const isPrint = location.pathname === "/print-images";

  return (
    <div
      style={{
        backgroundColor: isClosed
          ? "transparent"
          : skin
          ? "#6B8B8D"
          : "#ed2a11",
      }}
      className={`sidebar ${
        isClosed
          ? "sidebar-closed-main-container"
          : "sidebar-open-main-container"
      }`}
    >
      {isClosed && (
        <div className="sidebar-closed" onMouseEnter={handleMouseEnter}>
          {logoVisible && (
            <>
              {isClosed && (
                <div className="sidebar-closed-column">
                  <div className="sidebar-closed-container">
                    <div className="sidebar-closed-row">
                      <Link
                        style={{
                          color:
                            isFluid || isPad
                              ? "red"
                              : isMagazine
                              ? "#f1f1f1"
                              : "white",
                        }}
                        className="horizontal-logo"
                        to="/"
                      >
                        HOLOGRAMA
                      </Link>
                      {isClosed && (
                        <button
                          className="expand-icon"
                          onClick={toggleNavbarAndOptions}
                        >
                          <MdExpandMore
                            color={isPad || isFluid ? "red" : "white"}
                            size={25}
                          />
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="sidebar-closed-column-links">
                    {showIcons && (
                      <>
                        <Link to="/explore">
                          <FaCompass
                            size={24}
                            className="sidebar-closed-icon"
                          />
                        </Link>
                        <Link to="/interactives-list">
                          <FaPen size={24} className="sidebar-closed-icon" />
                        </Link>
                        <Link to="/login">
                          <FaSignInAlt
                            size={24}
                            className="sidebar-closed-icon"
                          />
                        </Link>
                        <Link to="/magazine">
                          <FaBook size={24} className="sidebar-closed-icon" />
                        </Link>
                        <button
                          onClick={() => setSkin((prevState) => !prevState)}
                        >
                          <FaAdjust size={24} className="sidebar-closed-icon" />
                        </button>
                      </>
                    )}
                  </div>
                  <div className="invisible-item" style={{ flex: 1 }} />
                </div>
              )}
            </>
          )}
        </div>
      )}
      {!isClosed && (
        <div className="sidebar-open">
          <div className="sidebar-open-logo-container">
            <p className="horizontal-logo">HOLOGRAMA</p>
          </div>
          <div className="sidebar-open-options-container" id="artOptions">
            {user?.displayName ? (
              <button className="nav-link" onClick={handleSignOut}>
                LOGOUT
              </button>
            ) : (
              <Link className="nav-link" to="/login">
                LOGIN
              </Link>
            )}

            <Link
              to="/magazine"
              className={`nav-link ${
                selectedView === "/magazine" ? "selected" : ""
              }`}
              onClick={() => handleOptionClick("/magazine")}
            >
              {t("magazine").toUpperCase()}
            </Link>
            <Link
              to="/creatives"
              className={`nav-link ${
                selectedView === "/creatives" ? "selected" : ""
              }`}
              onClick={() => handleOptionClick("/creatives")}
            >
              {t("creatives").toUpperCase()}
            </Link>
            <Link
              to="/interactives-list"
              className={`nav-link ${
                selectedView === "/interactives-list" ? "selected" : ""
              }`}
              onClick={() => handleOptionClick("/interactives-list")}
            >
              {t("SketchList").toUpperCase()}
            </Link>
          </div>
          <div className="sidebar-open-language-and-close-container">
            <NavbarLanguage
              isClosed={isClosed}
              selectedLanguage={selectedLanguage}
              changeLanguage={changeLanguage}
              toggleNavbarAndOptions={toggleNavbarAndOptions}
              openNavbar={openNavbar}
            />
          </div>
          <div className="sidebar-open-language-and-close-container">
            <div className="button-close-container">
              <button
                style={{ transform: "rotate(180deg)" }}
                onClick={toggleNavbarAndOptions}
              >
                <RiCloseFill color="#f6f6f6" size={35} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
