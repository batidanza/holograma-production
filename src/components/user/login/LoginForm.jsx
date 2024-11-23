import React from "react";
import { Link } from "react-router-dom";
import "../../management/FormManagementStyles.css";
import CustomTextInput from "../../management/FormComponents/CustomTextInput.jsx";
const LoginForm = ({ credentials, handleChange, handleSubmit, errors }) => {
  return (
    <div className="form-view-container">
      <div className="my-container-form">
        <h3 className="form-title">SIGN IN</h3>
        <form className="my-form-form" onSubmit={handleSubmit}>
          <div className="my-form-group-form">
            <label htmlFor="Username" className="my-label-form">
              Username
            </label>
            <CustomTextInput
              value={credentials.Username}
              onChange={(value) => handleChange({ target: { name: "Username", value } })}
              placeholder="Enter your username"
              required
            />
            {errors.Username && <div className="error">{errors.Username}</div>}
          </div>

          <div className="my-form-group-form">
            <label htmlFor="Password" className="my-label-form">
              Password
            </label>
            <CustomTextInput
              type="password"
              value={credentials.Password}
              onChange={(value) => handleChange({ target: { name: "Password", value } })}
              placeholder="Enter your password"
              required
            />
            {errors.Password && <div className="error">{errors.Password}</div>}
          </div>

          {errors.general && <div className="error">{errors.general}</div>}

          <button type="submit" className="my-button-form">
            Sign in          
          </button>
          
          <Link className="my-button-form" to="/Register">
              Sign up
            </Link>
      
 
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
