import React from "react";

const NotFound404 = () => {
  const currentPage = window.location.pathname;

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center flex-col gap-10">
      <h1 className="font-bold text-6xl bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-yellow-500 hover:from-yellow-400">
        404 Not found :(
      </h1>

      <h2 className="text-4xl px-10 text-white">
        La ruta "{currentPage.slice(1, currentPage.length)}" no existe
      </h2>
    </div>
  );
};

export default NotFound404;
