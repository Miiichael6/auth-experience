const jwt = require("jsonwebtoken");
const { User } = require("../config/database");
// verificar usuario
const checkAuth = async (req, res, next) => {
  let token;
  const myHeader = req.headers.authorization;
  if (myHeader && myHeader.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.logedUser = await User.findOne({
        attributes: ["id", "name", "email", "photo"],
        where: { id: decoded.id },
      });

      return next();
    } catch (error) {
      return res.status(403).send({ msg: error.message });
    }
  }

  if (!token) {
    const error = new Error("token no valido");
    return res.status(404).send({ msg: error.message });
  }
  next();
};

module.exports = checkAuth;