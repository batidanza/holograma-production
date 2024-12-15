import React from "react";
import "../FormManagementStyles.css";

const CustomTextInput = ({ type, value, onChange, placeholder, required, name }) => {
  const handleChange = (e) => {
    if (e && e.target && e.target.value !== undefined) {
      onChange(e);
    } else {
      console.error("Invalid event or event target in handleChange");
    }
  };

  return (
    <input
      type={type}
      className="custom-text-input"
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      required={required}
      name={name}
    />
  );
};

export default CustomTextInput;