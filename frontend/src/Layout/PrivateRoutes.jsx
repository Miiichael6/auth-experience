import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import deleteToken from "../helpers/deleteToken";
import InicioLoader from "../Pages/InicioLoader";
import { logOutUser } from "../redux/actions/authActions";

const PrivateRoutes = () => {
  const dispatch = useDispatch();
  const userLogin = localStorage.getItem("userLogin");
  const [cargando, setCargando] = useState(true);
  const user = useSelector((state) => state.AuthReducer.user);

  useEffect(() => {
    if (!userLogin) {
      localStorage.removeItem("userLogin");
      setCargando(false);
    }
    if (user.id) setCargando(false);
    // if (!user.id && userLogin) { // si eliminan lo cookie
    //   setCargando(false);
    //   return;
    // }
    console.log(user)
  }, [user.id]);

  if (cargando) return <InicioLoader />;

  if (userLogin && user.id) {
    if (JSON.parse(userLogin).id !== user.id) {
      localStorage.removeItem("userLogin");
      dispatch(logOutUser());

      return <Navigate to="/login" />;
    }
  }

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
