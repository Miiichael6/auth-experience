import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import InicioLoader from "../Pages/InicioLoader";

const PublicRoutes = () => {
  const [cargando, setCargando] = useState(true);
  const user = useSelector((state) => state.AuthReducer.user);

  useEffect(() => {
    const myToken = localStorage.getItem("token");
    const myLogedUser = JSON.parse(localStorage.getItem("loginUser"));
    if (!document.cookie) setCargando(false);
    if (myLogedUser?.id) setCargando(false);
  }, []);

  if (cargando) return <InicioLoader />;

  return (
    <>
      {user.id ? (
        <Navigate to="/home" />
      ) : (
        <main className="min-h-screen bg-black flex flex-col justify-center">
          <Outlet />
        </main>
      )}
    </>
  );
};

export default PublicRoutes;
