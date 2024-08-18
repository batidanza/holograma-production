import React, { createContext, useState, useEffect } from "react";
import { fetchUserProfile } from "../../../services/user/userProfileService";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchUserProfile(token).then((user) => setUser(user));
    }
  }, []);

  const isLoggedIn = () => {
    return user !== null;
  };

  const login = (user) => {
    setUser(user);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <UserContext.Provider value={{ user, isLoggedIn, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
