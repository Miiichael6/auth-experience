const { User, Post } = require("../config/database");
const bcrypt = require("bcrypt");
const { jwtGenerator } = require("../helpers/jwtGenerator");
const { verify } = require("jsonwebtoken");

const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await User.findAll({
      attributes: ["id", "name", "email", "photo", "createdAt", "updatedAt", "token"],
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
      attributes: ["name", "email", "photo", "createdAt", "updatedAt", "id"],
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
    await usuario.save();

    return res.send({
      id: usuario.id,
      photo: usuario.photo,
      name: usuario.name,
      email: usuario.email,
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

    usuario.token = jwtGenerator(usuario.id);

    await usuario.save();

    res.cookie("myToken", usuario.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 1000 * 60 * 60 * 24 * 30,
      path: "/",
    });

    return res.send({
      id: usuario.id,
      email: usuario.email,
      name: usuario.name,
      msg: "usuario logueado correctamente",
      photo: usuario.photo,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(404).send({ msg: error.message });
  }
};

const miPerfil = async (req, res) => {
  const { logedUser } = req;

  return res.send(logedUser);
};

const refrescarToken = async (req, res) => {
  const { logedUser } = req;
  const { token } = req.body;

  try {
    if (token) return res.status(401).send({ msg: "no estas autenticado" });

    const usuario = await User.findOne({
      where: {
        id: logedUser.id,
      },
    });

    return res.send(usuario);
  } catch (error) {
    console.log(error.message);
    return res.status(401).send(error.message);
  }
};

const logOutUser = async (req, res) => {
  const { myToken } = req.cookies;
  console.log(myToken);
  if (!myToken) {
    return res.status(401).json({ error: "no token" });
  }

  try {
    const id = verify(myToken, process.env.JWT_SECRET);

    res.cookie("myToken", null, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 0,
      path: "/",
    });

    return res.send({ msg: "successfullt logout" });
  } catch (error) {
    console.error(error.message);
    return res.status(400).json({ error: "invalid Token" });
  }
};

module.exports = {
  obtenerUsuarios,
  agregarUnUsuario,
  actualizarUsuario,
  eliminarUsuario,
  obtenerUnUsuario,
  usuarioLogin,
  miPerfil,
  logOutUser,
  refrescarToken,
};
