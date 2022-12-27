const { Router } = require("express");
const {
  eliminarPost,
  actualizarPost,
  agregarUnPost,
  obtenerUnPost,
  obtenerPosts,
} = require("../controllers/postControllers");

const routerPost = Router();

// /users

routerPost.get("/", obtenerPosts);
routerPost.post("/", agregarUnPost);
routerPost.get("/:id", obtenerUnPost);
routerPost.put("/:id", actualizarPost);
routerPost.delete("/:id", eliminarPost);

module.exports = routerPost;
