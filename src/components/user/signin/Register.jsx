import React, { useState } from 'react';
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

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'Image') {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: event.target.files[0],
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

    setIsLoading(true); 

    const apiResponse = await createUser(formData);

    setIsLoading(false);

    if (apiResponse.success) {
      alert('Request sent correctly');
      setFormData({
        Username: '',
        Password: '',
        Email: '',
        DateOfBirth:'',
        PhoneNumber:'',
        Image: null,
      });
    } else {
      console.error(apiResponse.error);
    }
  };

  return (
    <RegisterForm
      formData={formData}
      isLoading={isLoading} 
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
};

export default Register;