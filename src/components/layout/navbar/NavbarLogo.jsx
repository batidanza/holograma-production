import React from "react";
import { Link } from "react-router-dom";

function NavbarLogo({ isClosed, logo1, logo2 }) {
  return (
    <div className={`logo-class ${isClosed ? "logo-class-closed" : ""}`}>
      <Link to="/" className="navbar-brand">
        {isClosed ? (
          <p className="vertical-logo"> HOLOGRAMA </p>
        ) : (
          <p className="text-logo"> HOLOGRAMA </p>
        )}
      </Link>
    </div>
  );
}

export default NavbarLogo;
