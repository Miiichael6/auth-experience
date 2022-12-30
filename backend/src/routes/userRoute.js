const { Router } = require("express");
const {
  obtenerUsuarios,
  agregarUnUsuario,
  actualizarUsuario,
  eliminarUsuario,
  obtenerUnUsuario,
  usuarioLogin,
  miPerfil,
  logOutUser,
  refrescarToken,
} = require("../controllers/userControllers");
const checkAuth = require("../middleware/checkAuth");

const routerUsers = Router();

// /users

routerUsers.get("/", obtenerUsuarios);
routerUsers.post("/", agregarUnUsuario);
routerUsers.get("/detail/:id", checkAuth, obtenerUnUsuario);
routerUsers.put("/:id", checkAuth, actualizarUsuario);
routerUsers.delete("/:id", eliminarUsuario);
routerUsers.post("/login", usuarioLogin);
routerUsers.get("/my-perfil", checkAuth, miPerfil);
routerUsers.post("/logout", logOutUser);
routerUsers.post("/refresh", refrescarToken);

module.exports = routerUsers;
