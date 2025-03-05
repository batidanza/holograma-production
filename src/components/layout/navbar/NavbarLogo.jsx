import React from "react";
import { Link } from "react-router-dom";

function NavbarLogo({ isClosed, logo1, logo2 }) {
  return (
    <div className={`logo-class ${isClosed ? "logo-class-closed" : ""}`}>
      <Link to="/" className="navbar-brand">
        {isClosed ? (
          <p className="vertical-logo"> The Moving Canvas </p>
        ) : (
          <p className="text-logo"> The Moving Canvas</p>
        )}
      </Link>
    </div>
  );
}

export default NavbarLogo;
