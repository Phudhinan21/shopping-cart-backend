const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  const token = req.get("x-auth-token");

  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

  req.userId = decodedToken.user.userId;

  next();
};

module.exports = auth;
