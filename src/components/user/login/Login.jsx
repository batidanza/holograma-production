import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { loginUser } from "../../../services/user/userProfileService";
import LoginForm from "./LoginForm";

const Login = () => {
  const [credentials, setCredentials] = useState({
    Username: "",
    Password: "",
  });
  const [errors, setErrors] = useState({});
  const { login } = useContext(UserContext);
  const navigate = useNavigate();

  const validate = () => {
    const errors = {};
    if (!credentials.Username) errors.Username = "Username is required.";
    else if (credentials.Username.length < 3) errors.Username = "Username must be at least 3 characters.";
    if (!credentials.Password) errors.Password = "Password is required.";
    else if (credentials.Password.length < 6) errors.Password = "Password must be at least 6 characters.";
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate();
    setErrors(errors);
    if (Object.keys(errors).length === 0) {
      const result = await loginUser(credentials);
      if (result.success) {
        localStorage.setItem("token", result.token);
        login(result.user);
        navigate("/");
      } else {
        setErrors({ general: "Login failed. Please check your username and password and try again." });
      }
    }
  };

  return (
    <div>
      <LoginForm
        credentials={credentials}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        errors={errors}
      />
    </div>
  );
};

export default Login;
