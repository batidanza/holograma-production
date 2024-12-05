import React from "react";
import PropTypes from "prop-types";
import "./ScrollBar.css"; 

const ScrollBar = ({ children, className, style }) => {
  return (
    <div className={`scroll-bar ${className || ""}`} style={style}>
      {children}
    </div>
  );
};

ScrollBar.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
};

export default ScrollBar;
