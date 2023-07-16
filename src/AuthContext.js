import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem("token") || null);
  const [admin, setAdmin] = useState(localStorage.getItem("admin") || "Muskan Singla")
  return (
    <AuthContext.Provider value={{ authToken, setAuthToken, admin, setAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};