import React from "react";
import dolphines from "../../../assets/dolphines.png";

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
          ENGLISH
        </button>
        <span className="language-separator"></span>
        <button
          className={`language-button ${
            selectedLanguage === "es" ? "selected" : ""
          }`}
          onClick={() => changeLanguage("es")}
        >
          SPANISH
        </button>
      </div>
      {!isClosed && (
        <button className="close-button" onClick={toggleNavbarAndOptions}>
          <img lassName="image-button" src={dolphines}></img>
        </button>
      )}

      {isClosed && (
        <button className="open-button" onClick={openNavbar}>
          <img className="image-button" src={dolphines}></img>
        </button>
      )}
    </div>
  );
}

export default NavbarLanguage;
