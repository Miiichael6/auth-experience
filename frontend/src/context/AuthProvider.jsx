import axios from "axios";
import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const current = window.location.pathname;
  const navigate = useNavigate();
  const [auth, setAuth] = useState({});

  useEffect(() => {
    const autenticarUsuario = async () => {
      const token = localStorage.getItem("token");

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
    };

    autenticarUsuario();
  }, []);

  return (
    <AuthContext.Provider value={{ setAuth, auth, cargando }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
