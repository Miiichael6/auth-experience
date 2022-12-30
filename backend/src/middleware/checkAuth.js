const jwt = require("jsonwebtoken");
const { User } = require("../config/database");
// verificar usuario
const checkAuth = async (req, res, next) => {
  let { myToken } = req.cookies;
  console.log(myToken, "**** token req. cookies");

  if (!myToken) {
    const error = new Error("token no valido");
    return res.status(401).send({ msg: error.message });
  }
  req.headers.authorization = myToken;

  let tokenAccess = req.headers.authorization;
  console.log(tokenAccess, "token res.authtorization****");

  try {
    const decoded = jwt.verify(tokenAccess, process.env.JWT_SECRET);
    req.logedUser = await User.findOne({
      attributes: ["id", "name", "email", "photo"],
      where: { id: decoded.id },
    });

    return next();
  } catch (error) {
    return res.status(401).send({ msg: error.message });
  }
};

module.exports = checkAuth;
