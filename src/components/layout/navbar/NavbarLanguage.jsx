import React from "react";
import { RiExpandRightLine } from "../../../../node_modules/react-icons/ri";

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
        <button
          style={{ marginBottom: "20px", transform: "rotate(180deg)" }}
          onClick={toggleNavbarAndOptions}
        >
          <RiExpandRightLine color="white" size={35} />
        </button>
      )}

      {isClosed && (
        <button style={{ marginBottom: "20px" }} onClick={openNavbar}>
          <RiExpandRightLine color="white" size={35} />
        </button>
      )}
    </div>
  );
}

export default NavbarLanguage;
