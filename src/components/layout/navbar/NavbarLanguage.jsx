import React from "react";
import rainbow from "../../../assets/red-arrow.png";

function NavbarLanguage({
  isClosed,
  selectedLanguage,
  changeLanguage,
  toggleNavbarAndOptions,
  openNavbar,
}) {
  return (
    <div className={`class-lang ${isClosed ? "class-lang-closed" : ""}`}>
      <div className="nav-lang">
        <button
          className={`language-button ${
            selectedLanguage === "en" ? "selected" : ""
          }`}
          onClick={() => changeLanguage("en")}
        >
          EN
        </button>
        <span className="language-separator"></span>
        <button
          className={`language-button ${
            selectedLanguage === "es" ? "selected" : ""
          }`}
          onClick={() => changeLanguage("es")}
        >
          ES
        </button>
      </div>
      {!isClosed && (
        <img
          className="image-button-open"
          onClick={toggleNavbarAndOptions}
          src={rainbow}
        ></img>
      )}

      {isClosed && (
        <img
          className="image-button"
          onClick={openNavbar}
          src={rainbow}
        ></img>
      )}
    </div>
  );
}

export default NavbarLanguage;
