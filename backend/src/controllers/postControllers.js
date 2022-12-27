const { Post, User } = require("../config/database");

const obtenerPosts = async (req, res) => {
  try {
    console.log("aqui");
    const posts = await Post.findAll();

    return res.send(posts);
  } catch (error) {
    console.log(error.message);
  }
};

const obtenerUnPost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findOne({ id });

    return res.send(post);
  } catch (error) {
    console.log(error);
  }
};

const agregarUnPost = async (req, res) => {
  const { descripcion, id } = req.body;
  try {
    const usuario = await User.findOne({
      where: {
        id: id,
      },
    });
    if (!usuario) {
      return res.status(404).send({ msg: "no se encontró el usuario" });
    }
    const añadirPost = await Post.create({ descripcion });

    await añadirPost.setUser(id);

    return res.send(añadirPost);
  } catch (error) {
    console.log(error.message);
  }
};

const actualizarPost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findOne({ id });

    return res.send(post);
  } catch (error) {
    console.log(error);
  }
};

const eliminarPost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findOne({ id });

    await post.destroy();

    return res.send({ msg: "eliminado correctamente" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  eliminarPost,
  actualizarPost,
  agregarUnPost,
  obtenerUnPost,
  obtenerPosts,
};
