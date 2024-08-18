import React from "react";
import "./FormStyles.css";
import { Link } from "react-router-dom";

const LoginForm = ({ credentials, handleChange, handleSubmit, errors }) => {
  return (
    <div className="my-container-login">
      <div className="my-form-items">
        <form className="my-form" onSubmit={handleSubmit}>
          <div className="my-input-container-form">
            <label className="my-label-form">Username</label>
            <input
              type="text"
              className="my-input-form"
              name="Username"
              value={credentials.Username}
              onChange={handleChange}
            />
            {errors.Username && <div className="error">{errors.Username}</div>}
          </div>
          <div className="my-input-container-form">
            <label className="my-label-form">Password</label>
            <input
              className="my-input-form"
              type="password"
              name="Password"
              value={credentials.Password}
              onChange={handleChange}
            />
            {errors.Password && <div className="error">{errors.Password}</div>}
          </div>
          {errors.general && <div className="error">{errors.general}</div>}
          <div className="my-input-container-form">
            <button className="my-button-form" type="submit">
              Sign in
            </button>
          </div>
          <div className="my-input-container-form">
            <Link className="my-link-form" to="/Register">
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
