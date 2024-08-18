import React, { useState } from 'react';

const RegisterForm = ({ formData, isLoading, handleChange, handleSubmit }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    handleChange(event); // Propaga el evento para manejar el archivo seleccionado en el componente padre
  };

  return (
    <div className="my-container-register">
     <div className="my-form-items">
        {isLoading && <div className='loading-form'>LOADING...</div>}
        <form className='my-form'  onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="my-input-container-form">
            <label className="my-label-form" htmlFor="Username">
              USERNAME
            </label>
            <input
              type="text"
              className="my-input-form"
              name="Username"
              value={formData.Username}
              onChange={handleChange}
            />
          </div>
          <div className="my-input-container-form">
            <label className="my-label-form" htmlFor="Password">
              PASSWORD
            </label>
            <input
              type="password"
              className="my-input-form"
              name="Password"
              value={formData.Password}
              onChange={handleChange}
            />
          </div>
          <div className="my-input-container-form">
            <label className="my-label-form" htmlFor="Email">
              EMAIL
            </label>
            <input
              type="email"
              className="my-input-form"
              name="Email"
              value={formData.Email}
              onChange={handleChange}
            />
          </div>
          <div className="my-input-container-form">
            <label className="my-label-form" htmlFor="Image">
              PROFILE IMAGE
            </label>
            <div className="custom-file-container">
              <input
                type="file"
                className="custom-file-input"
                id="inputGroupFile01"
                name="Image"
                onChange={handleFileChange}
              />
              <label className="custom-file-label" htmlFor="inputGroupFile01">
                {selectedFile ? selectedFile.name : "Choose file"}
              </label>
            </div>
          </div>
          <input type="submit" value="Enviar" className="my-button-form" />
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;

