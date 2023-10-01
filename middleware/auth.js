const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  const token = req.get("x-auth-token");

  if (!token) {
    const error = new Error("Not Authenticated, no token");
    error.code = 401;
    return next(error);
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decodedToken.user.userId;

    next();
  } catch (err) {
    const error = new Error("Not Authenticated, Invalid token.");
    error.code = 401;
    return next(error);
  }
};

module.exports = auth;
