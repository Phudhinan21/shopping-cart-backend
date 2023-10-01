const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const Cart = require("../models/cart");

exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId);

    if (!user) {
      const error = new Error("Not Authenticated, No account.");
      error.code = 401;
      throw error;
    }

    res.status(200).json({
      message: "Authenticated successfull",
      user: { userId: user.id },
    });
  } catch (error) {
    return next(error);
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.findAll();

    res.status(200).json({ message: "All users", users: users });
  } catch (error) {
    return next(error);
  }
};

exports.postCreateUser = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email: email } });

    if (user) {
      const error = new Error("This email already exist, pleas try again.");
      error.code = 401;
      throw error;
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const userResult = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const cartResult = await Cart.create({ UserId: userResult.id });

    const token = jwt.sign(
      { user: { userId: userResult.id } },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).json({
      message: "Signup successfull",
      token: token,
      user: { userId: userResult.id },
    });
  } catch (error) {
    return next(error);
  }
};

exports.postLoginUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      const error = new Error("Not Authenticated, please signup.");
      error.code = 401;
      throw error;
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      const error = new Error("Not Authenticated, Please check your password.");
      error.code = 401;
      throw error;
    }

    const token = jwt.sign(
      { user: { userId: user.id } },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successfull",
      token: token,
      user: { userId: user.id },
    });
  } catch (error) {
    return next(error);
  }
};

exports.postDeleteUser = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId);

    if (!user) {
      const error = new Error("Not Authenticated, No account.");
      error.code = 401;
      throw error;
    }

    const result = await User.destroy({ where: { id: req.userId } });

    res.status(200).json({ message: "Delete user successfull", user: result });
  } catch (error) {
    return next(error);
  }
};
