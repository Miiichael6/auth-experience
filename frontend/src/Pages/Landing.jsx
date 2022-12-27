import React from "react";
import { useSelector } from "react-redux";

const Landing = () => {
  const user = useSelector((state) => state.AuthReducer.user);

  console.log(user);

  return (
    <div>
      <h1 className="text-white font-bold">Landing</h1>
    </div>
  );
};

export default Landing;
