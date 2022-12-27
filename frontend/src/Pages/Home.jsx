import React from "react";
import { useSelector } from "react-redux";

const Home = () => {
  const { name } = useSelector((state) => state.AuthReducer.user);

  return (
    <div className="text-black bg-neutral-900 min-h-screen">
      <p className="font-bold text-white text-4xl">
        Bienvenido{" "}
        <span className="font-bold text-transparent text-5xl bg-clip-text bg-gradient-to-r from-cyan-400 to-green-500">
          {name}
        </span>
      </p>
    </div>
  );
};

export default Home;
