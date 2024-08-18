export const fetchUsers = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/users/user`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener users:", error);
    return [];
  }
};

export const fetchUserById = async (userId) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/users/users/${userId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener usuario por ID:", error);
    return { success: false, error: "Error al obtener usuario por ID" };
  }
};

export const fetchUsersByUsername = async (username) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/users/profile-searched/${username}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener usuarios por nombre de usuario:", error);
    return [];
  }
};
