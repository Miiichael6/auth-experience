import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import deleteToken from "../helpers/deleteToken";
import InicioLoader from "../Pages/InicioLoader";

const PrivateRoutes = () => {
  const [cargando, setCargando] = useState(true);
  const user = useSelector((state) => state.AuthReducer.user);
  useEffect(() => {
    if (user.id) setCargando(false);
    if (user.msgErr) {
      deleteToken();
      localStorage.removeItem("loginUser");
      setCargando(false);
    }
  }, [user.id, user.msgErr]);

  if (cargando) return <InicioLoader />;

  return user.id ? (
    <>
      <div>
        <Header />
        <Outlet />
      </div>
    </>
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoutes;
