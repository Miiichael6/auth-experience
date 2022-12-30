import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import deleteToken from "../helpers/deleteToken";
import { logOutUser } from "../redux/actions/authActions";

const Header = () => {
  const dispatch = useDispatch();
  const profile = useRef(null);
  const navigate = useNavigate();
  const [display, setDisplay] = useState(true);
  const { photo } = useSelector((state) => state.AuthReducer.user);

  const detailsProfile = () => {
    setDisplay(!display);
  };

  const logOut = () => {
    localStorage.removeItem("userLogin");
    dispatch(logOutUser());
    navigate("/login");
  };

  const profileOptions = (e) => {
    const myProfile = profile.current;
    const boton = e.target.textContent;

    if (boton === "Perfil") {
      navigate("/perfil");
      setDisplay(true);
    } else if (boton === "Inicio") {
      navigate("/home");
      setDisplay(true);
    } else if (boton === "Cerrar Sesion") {
      logOut();
      setDisplay(true);
    }
  };

  return (
    <header className="bg-black p-3 flex justify-between items-center">
      <div>
        <Link to="/home">
          <p className="text-4xl font-extrabold bg-gradient-to-r from-pink-600 to-blue-400 text-transparent bg-clip-text">
            Mi Auth
          </p>
        </Link>
      </div>

      <div className="p-2 relative">
        <img
          src={photo}
          alt="user"
          className="w-10 h-10 rounded-full cursor-pointer"
          onClick={detailsProfile}
        />
        <div
          className={`absolute w-56 text-white font-bold top-14 right-2 rounded-xl py-2 px-2 bg-zinc-800  ${
            display && "hidden"
          }`}
          onClick={profileOptions}
          ref={profile}
        >
          <Link
            to="/perfil"
            className="block text-left p-2 w-full hover:bg-zinc-600 hover:text-white hover:rounded-md my-1"
          >
            Inicio
          </Link>
          <Link
            to="/perfil"
            className="block text-left p-2 w-full hover:bg-zinc-600 hover:text-white hover:rounded-md my-1"
          >
            Perfil
          </Link>
          <button
            className="block p-2 w-full bg-zinc-600 hover:text-white hover:rounded-md text-center hover:bg-rose-500 rounded-md my-1"
            onClick={logOut}
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
