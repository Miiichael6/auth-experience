const { verify } = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  const { myToken } = req.cookies;

  if (!myToken) {
    return res.status(401).send({ msg: "error no estas autenticado" });
  }
  try {
    const decoded = verify(myToken, process.env.JWT_SECRET);
    req.logedUser = await User.findOne({ where: { id: decoded.id } });
    next();
  } catch (error) {
    return res.status(401).send({ msg: error.message });
  }
};

module.exports = verifyToken;
