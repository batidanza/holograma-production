import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { createUser } from '../../../services/user/userProfileService';
import RegisterForm from './RegisterForm';

const Register = () => {
  const [formData, setFormData] = useState({
    Username: '',
    Password: '',
    Email: '',
    Image: null,
  });

  const [isLoading, setIsLoading] = useState(false); 
  const [error, setError] = useState(null); 
  const navigate = useNavigate(); 

  const handleChange = (event) => {
    const { name, value, files } = event.target;

    if (name === 'Image') {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: files && files[0] ? files[0] : null, 
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.Image) {
      setError('An image file is required.');
      return;
    }

    setIsLoading(true); 
    setError(null);

    const apiResponse = await createUser(formData);

    setIsLoading(false);

    if (apiResponse.success) {
      navigate('/login'); // Redirige a /login
      setFormData({
        Username: '',
        Password: '',
        Email: '',
        Image: null,
      });
    } else {
      setError(apiResponse.error || 'Something went wrong.');
      console.error(apiResponse.error);
    }
  };

  return (
    <RegisterForm
      formData={formData}
      isLoading={isLoading} 
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      error={error}
    />
  );
};

export default Register;
