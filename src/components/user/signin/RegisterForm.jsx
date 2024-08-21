import React, { useState } from "react";
import "../../management/FormManagementStyles.css";
import CustomTextInput from "../../management/FormComponents/CustomTextInput";
import LoadingSketch from "../../layout/Loading/LoadingSketch";

const RegisterForm = ({ formData, isLoading, handleChange, handleSubmit, error, redirectToLogin }) => {
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const { files } = e.target;
    if (files && files[0]) { 
      const file = files[0];
      handleChange({ target: { name: "Image", files } }); 
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = (e) => {
    e.stopPropagation(); 
    handleChange({ target: { name: "Image", files: [] } }); 
    setPreview(null);
  };

  return (
    <div className="form-view-container">
      <div className="my-container-form">
        {isLoading && <LoadingSketch/> }
        {error && <div className="error-message">{error}</div>} 
        <h3 className="form-title">REGISTER</h3>
        <form
          className="my-form-form"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <div className="my-form-group-form">
            <label className="my-label-form" htmlFor="Username">
              USERNAME
            </label>
            <CustomTextInput
              value={formData.Username}
              onChange={(value) =>
                handleChange({ target: { name: "Username", value } })
              }
              placeholder="Enter your username"
              required
            />
          </div>

          <div className="my-form-group-form">
            <label className="my-label-form" htmlFor="Password">
              PASSWORD
            </label>
            <CustomTextInput
              type="password"
              value={formData.Password}
              onChange={(value) =>
                handleChange({ target: { name: "Password", value } })
              }
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="my-form-group-form">
            <label className="my-label-form" htmlFor="Email">
              EMAIL
            </label>
            <CustomTextInput
              type="email"
              value={formData.Email}
              onChange={(value) =>
                handleChange({ target: { name: "Email", value } })
              }
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="my-form-group-form">
            <label className="my-label-form" htmlFor="Image">
              PROFILE IMAGE
            </label>
            <div
              className="drop-zone"
              onClick={() => document.querySelector('input[name="Image"]').click()}
            >
              <input
                type="file"
                className="my-input-form"
                name="Image"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
              {preview ? (
                <div style={{ position: "relative" }}>
                  <img
                    src={preview}
                    alt="Preview"
                    style={{
                      width: "100px",
                      height: "auto",
                      margin: "5px",
                    }}
                  />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    style={{
                      position: "absolute",
                      top: "0",
                      right: "0",
                      background: "rgba(255, 0, 0, 0.8)",
                      border: "none",
                      color: "white",
                      cursor: "pointer",
                      borderRadius: "50%",
                      width: "24px",
                      height: "24px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "14px",
                    }}
                  >
                    X
                  </button>
                </div>
              ) : (
                <p>Drop an Image or click to select it</p>
              )}
            </div>
          </div>

          <button type="submit" className="my-button-form">
            REGISTER
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
