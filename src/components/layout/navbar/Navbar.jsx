import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";
import { useTranslation } from "react-i18next";
import NavbarLanguage from "./NavbarLanguage";
import { MdExpandMore } from "../../../../node_modules/react-icons/md";
import { RiCloseFill } from "react-icons/ri";
import { UserAuth } from "../../../AuthContext";

const Navbar = () => {
  const { t, i18n } = useTranslation();

  const { user, logout } = UserAuth();
  const [isClosed, setIsClosed] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [selectedView, setSelectedView] = useState("/");
  const [logoVisible, setLogoVisible] = useState(true); // Estado para controlar la visibilidad del logo

  // Función para alternar la visibilidad del logo al hacer scroll
  const handleScroll = () => {
    if (window.scrollY > 50) {
      // Ajusta el valor de 50 según el umbral que desees
      setLogoVisible(false);
    } else {
      setLogoVisible(true);
    }
  };

  // Función para mostrar el logo cuando se hace hover
  const handleMouseEnter = () => {
    if (!isPrint) {
      // Solo funciona si no estamos en la ruta de impresión
      setLogoVisible(true);
    }
  };

  // Usar useEffect para agregar el evento de scroll
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

  const location = useLocation();
  const isMagazine = location.pathname === "/magazine";
  const isFluid = location.pathname === "/fluid-component";
  const isPad = location.pathname === "/pad";
  const isPrint = location.pathname === "/print-images";

  return (
    <div className={`sidebar ${isClosed ? "navbar-closed" : "navbar-open"}`}>
      <div
        className={`logo-class ${isClosed ? "logo-class-closed" : ""}`}
        onMouseEnter={handleMouseEnter} // Detecta el hover sobre el logo
      >
        <button
          onClick={toggleNavbarAndOptions}
          className="navbar-brand"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
        >
          {logoVisible && (
            <>
              {isClosed ? (
                <p
                  style={{
                    color:
                      isFluid || isPad
                        ? "red"
                        : isMagazine
                        ? "#f1f1f1"
                        : "white",
                  }}
                  className="vertical-logo"
                >
                  HOLOGRAMA
                </p>
              ) : (
                <p className="text-logo">HOLOGRAMA</p>
              )}
            </>
          )}

          {isClosed && (
            <button className="expand-icon" onClick={openNavbar}>
              <MdExpandMore
                color={isPad || isFluid ? "red" : "white"}
                size={25}
              />
            </button>
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

      {!isClosed && (
        <div className="language-and-close-container">
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
              <RiCloseFill color="#f6f6f6" size={35} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
