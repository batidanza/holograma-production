export const createUser = async (formData) => {
    try {
      const apiEndpoint = `${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/users/createUser`;
      const form = new FormData();
  
      for (const key in formData) {
        form.append(key, formData[key]);
      }
  
      const response = await fetch(apiEndpoint, {
        method: "POST",
        body: form,
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log("Solicitud creada:", data);
        return { success: true, data };
      } else {
        console.error("Error al crear la solicitud");
        return { success: false, error: "Error al crear la solicitud" };
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      return { success: false, error: "Error en la solicitud" };
    }
  };
  
  export const loginUser = async (credentials) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log("Inicio de sesión exitoso:", data);
        return { success: true, token: data.token, user: data.user };
      } else {
        console.error("Error en el inicio de sesión");
        return { success: false, error: "Error en el inicio de sesión" };
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      return { success: false, error: "Error en la solicitud" };
    }
  };
  
  export const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/users/profile`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log("Perfil del usuario:", data);
        return data.user;
      } else {
        console.error("Error al obtener el perfil del usuario");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };
  
  export const editUserProfile = async (userId, formData, token) => {
    try {
      console.log("ID del usuario:", userId);
      console.log("Token de autenticación:", token); 
  
      const apiEndpoint = `${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/users/user/${userId}/edit`;
  
      const form = new FormData();
  
      for (const key in formData) {
        form.append(key, formData[key]);
      }
  
      const options = {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: form,
      };
  
      const response = await fetch(apiEndpoint, options);
  
      if (response.ok) {
        console.log("Perfil de usuario actualizado correctamente");
        return { success: true };
      } else {
        console.error("Error al actualizar el perfil del usuario");
        return {
          success: false,
          error: "Error al actualizar el perfil del usuario",
        };
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      return { success: false, error: "Error en la solicitud" };
    }
  };
  