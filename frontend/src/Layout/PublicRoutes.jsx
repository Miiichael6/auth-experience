import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import InicioLoader from "../Pages/InicioLoader";
import { logOutUser } from "../redux/actions/authActions";

const PublicRoutes = () => {
  const dispatch = useDispatch();
  const userLogin = localStorage.getItem("userLogin");
  const [cargando, setCargando] = useState(true);
  const user = useSelector((state) => state.AuthReducer.user);

  useEffect(() => {
    if (!userLogin && user.id) {
      console.log(userLogin, user);
      async function removeUserState() {
        console.log(user);
        await dispatch(logOutUser());
        console.log("deslogeo");
        setCargando(false);
        return;
      }
      removeUserState();
      return;
    }
    if (userLogin) {
      setCargando(false);
      return;
    }
    if (!user.id) {
      setCargando(false);
      return;
    }
    if (userLogin && !user.id) {
      setCargando(false);
    }
  }, [user.id]);

  if (cargando) return <InicioLoader />;

  if (userLogin && user.id) {
    if (JSON.parse(userLogin).id === user.id) {
      return <Navigate to="/home" />;
    }
  }

  if (!userLogin && !user.id) {
    return (
      <>
        <main className="min-h-screen bg-black flex flex-col justify-center">
          <Outlet />
        </main>
      </>
    );
  }

  return (
    <>
      <main className="min-h-screen bg-black flex flex-col justify-center">
        <Outlet />
      </main>
    </>
  );
};

export default PublicRoutes;
