import React, { useState } from 'react';
import { GoogleButton } from 'react-google-button';
import { UserAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import "./components/management/FormManagementStyles.css";
import CustomTextInput from './components/management/FormComponents/CustomTextInput';
import LoadingSketch from './components/layout/Loading/LoadingSketch';


const Signin = () => {

  const { googleSignIn, emailSignUp } = UserAuth(); // Asume que tienes una función `emailSignUp` en tu contexto de autenticación.
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ Email: '', Password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      await googleSignIn();
      navigate('/interactives-list');
    } catch (error) {
      setError('Error signing in with Google');
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
    setError('');
    try {
      await emailSignUp(formData.Email, formData.Password); // Implementa esta función en tu `AuthContext`.
      navigate('/dashboard'); // Redirige al usuario después de registrarse.
    } catch (error) {
      setError('Error signing up. Please try again.');
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
        <h1 className="text-center text-3xl font-bold py-8">Sign In</h1>
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
            REGISTER
          </button>
        </form>
        <div className="max-w-[240px] m-auto py-4">
          <GoogleButton onClick={handleGoogleSignIn} />
        </div>
      </div>
    </div>
  );
};

export default Signin;
