import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import PrivateRoutes from "./Layout/PrivateRoutes";
import PublicRoutes from "./Layout/PublicRoutes";
import Home from "./Pages/Home";
import Landing from "./Pages/Landing";
import Login from "./Pages/Login";
import NotFound404 from "./Pages/NotFound404";
import Perfil from "./Pages/Perfil";
import Register from "./Pages/Register";
import { perfilDeUsuario } from "./redux/actions/authActions";

function App() {
  const user = useSelector((state) => state.AuthReducer.user);
  const dispatch = useDispatch();

  useEffect(() => {
    async function checkAuth() {
      await dispatch(perfilDeUsuario());
    }
    checkAuth();
  }, [user.id]);

  return (
    <div>
      <Routes>
        <Route element={<PublicRoutes />}>
          <Route path="/" element={<Landing />} />
          <Route index path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route element={<PrivateRoutes />}>
          <Route path="/home" element={<Home />} />
          <Route path="/perfil" element={<Perfil />} />
        </Route>

        <Route path="*" element={<NotFound404 />}></Route>
      </Routes>
    </div>
  );
}

export default App;
