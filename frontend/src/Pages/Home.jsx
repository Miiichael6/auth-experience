import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../Components/Header";
import { perfilDeUsuario } from "../redux/actions/authActions";

const Home = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.AuthReducer.user);

  useEffect(() => {
    dispatch(perfilDeUsuario());
  }, [user.id]);
  console.log(user);

  return (
    <div className="text-black bg-neutral-900 min-h-screen">
      <p className="font-bold text-white text-4xl">
        Bienvenido{" "}
        <span className="font-bold text-transparent text-5xl bg-clip-text bg-gradient-to-r from-cyan-400 to-green-500">
          {user.name}
        </span>
      </p>
    </div>
  );
};

export default Home;
