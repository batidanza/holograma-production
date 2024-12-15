import React, { useState } from "react";
import "../../management/FormManagementStyles.css";

const RegisterForm = ({

}) => {

  return (
    <div className="form-view-container">
      <div className="my-container-form">
        {isLoading && <LoadingSketch />}
        {error && <div className="error-message">{error}</div>}
        <h3 className="form-title">REGISTER</h3>
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
              value={formData.Email}
              onChange={(value) =>
                handleChange({ target: { name: "Email", value } })
              }
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
              value={formData.Password}
              onChange={(value) =>
                handleChange({ target: { name: "Password", value } })
              }
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="my-form-group-form"> 
 DATE OF BORTH
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
