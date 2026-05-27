import React, { createContext, useContext, useEffect, useState } from "react";

import API from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  /* =====================================
     LOAD USER
  ===================================== */

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);

        return;
      }

      try {
        const res = await API.get("/auth/me");

        setUser(res.data.user);
      } catch (error) {
        console.log(error);

        localStorage.removeItem("token");
      }

      setLoading(false);
    };

    loadUser();
  }, []);

  /* =====================================
     REGISTER
  ===================================== */

  const register = async (formData) => {
    const res = await API.post("/auth/register", formData);

    localStorage.setItem("token", res.data.token);

    setUser(res.data.user);

    return res.data;
  };

  /* =====================================
     LOGIN
  ===================================== */

  const login = async (formData) => {
    const res = await API.post("/auth/login", formData);

    localStorage.setItem("token", res.data.token);

    setUser(res.data.user);

    return res.data;
  };

  /* =====================================
     LOGOUT
  ===================================== */

  const logout = () => {
    localStorage.removeItem("token");

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,

        loading,

        login,

        register,

        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
