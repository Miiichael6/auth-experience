const { Router } = require("express");
const routerUsers = require("./userRoute");
const routerPosts = require("./postRoute.js")

const mainRouter = Router();

mainRouter.get("/", (req, res) => {
  return res.send({msg: "exitosamente"})
})

mainRouter.use("/users", routerUsers);
mainRouter.use("/posts", routerPosts);

module.exports = mainRouter;
