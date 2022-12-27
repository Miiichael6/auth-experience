const { User, Post } = require("../config/database");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../helpers/jwtGenerator");

const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await User.findAll({
      attributes: [
        "id",
        "name",
        "email",
        "photo",
        "createdAt",
        "updatedAt",
        "token",
      ],
      order: [["createdAt", "ASC"]],
    });

    return res.send(usuarios);
  } catch (error) {
    console.log(error);
  }
};

const obtenerUnUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await User.findOne({
      where: { id: id },
      include: { model: Post },
      order: [[Post, "createdAt", "ASC"]],
    });

    if (!usuario) {
      return res.status(401).send({ msg: "Usuario inexistente" });
    }

    return res.send(usuario);
  } catch (error) {
    console.log(error);
    return res.status(401).send({ msg: error.message });
  }
};

const agregarUnUsuario = async (req, res) => {
  const { name, password, email } = req.body;
  try {
    const existeUsuario = await User.findOne({ where: { email: email } });

    if (existeUsuario) {
      const error = new Error("El usuario ya está registrado");
      return res.status(404).send({ msg: error.message });
    }

    const salt = await bcrypt.genSalt(10);
    const usuario = await User.create({ name, password, email });

    usuario.password = await bcrypt.hash(usuario.password, salt);
    usuario.token = jwtGenerator(usuario.id);
    await usuario.save();

    return res.send({
      id: usuario.id,
      photo: usuario.photo,
      name: usuario.name,
      email: usuario.email,
      token: usuario.token
    });
  } catch (error) {
    console.log(error.message);
  }
};

const actualizarUsuario = async (req, res) => {
  try {
    const { name, photo } = req.body;
    const { id } = req.params;
    const usuario = await User.findOne({
      where: {
        id,
      },
    });

    usuario.photo = photo || usuario.photo;
    usuario.name = name || usuario.name;
    await usuario.save();

    return res.send(usuario);
  } catch (error) {
    console.log(error);
  }
};

const eliminarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await User.findOne({ id });

    await usuario.destroy();

    return res.send(usuario);
  } catch (error) {
    console.log(error);
  }
};

const usuarioLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const usuario = await User.findOne({
      where: { email: email },
    });

    if (!usuario) {
      const error = new Error("el usuario no está registrado");
      return res.status(401).send({ msg: error.message });
    }

    const verifyPassword = await bcrypt.compare(password, usuario.password);

    if (!verifyPassword) {
      return res.status(402).send({ msg: "contraseña o email incorrectos" });
    }

    return res.send({
      user: usuario,
      message: "usuario logueado correctamente",
    });
  } catch (error) {
    console.log(error.message);
  }
};

const miPerfil = async (req, res) => {
  const { logedUser } = req;
  console.log(logedUser);

  return res.send(logedUser);
};

module.exports = {
  obtenerUsuarios,
  agregarUnUsuario,
  actualizarUsuario,
  eliminarUsuario,
  obtenerUnUsuario,
  usuarioLogin,
  miPerfil,
};
