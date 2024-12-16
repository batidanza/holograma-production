import React, { useState } from "react";
import { GoogleButton } from "react-google-button";
import { UserAuth } from "./AuthContext";
import { Link, useNavigate } from "react-router-dom";
import "./components/management/FormManagementStyles.css";
import CustomTextInput from "./components/management/FormComponents/CustomTextInput";
import LoadingSketch from "./components/layout/Loading/LoadingSketch";
import googleLogo from "./assets/icons/google_logo.svg"

const Login = () => {
  const { googleSignIn, emailLogin } = UserAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ Email: "", Password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      await googleSignIn();
      navigate("/interactives-list");
    } catch (error) {
      setError("Error logging in with Google");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      await emailLogin(formData.Email, formData.Password); // Implementa esta función en tu `AuthContext`.
      navigate("/interactives-list"); // Redirige al éxito
    } catch (error) {
      setError("Error logging in. Please check your credentials.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="form-view-container">
      <div className="my-container-form">
        {isLoading && <LoadingSketch />}
        {error && <div className="error-message">{error}</div>}
        <h2 className="my-form-title">Login</h2>
        <form
          className="my-form-form"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <div className="my-form-group-form">
            <label className="my-label-form" htmlFor="Email">
              EMAIL
            </label>
            <CustomTextInput
              type="email"
              name="Email"
              value={formData.Email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="my-form-group-form">
            <label className="my-label-form" htmlFor="Password">
              PASSWORD
            </label>
            <CustomTextInput
              type="password"
              name="Password"
              value={formData.Password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="my-button-form">
            LOGIN
          </button>
          <Link to="/signin" className="my-button-form">
            SIGN IN
          </Link>
        </form>
     
          <button className="google-login-button" onClick={handleGoogleLogin}>
            <img src={googleLogo} />
            <p>Continue with Google</p>
          </button>

      </div>
    </div>
  );
};

export default Login;
