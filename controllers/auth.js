const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId);

    res.status(200).json({
      message: "Authenticated successfull",
      user: { userId: user.id },
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.findAll();

    res.status(200).json({ message: "All users", users: users });
  } catch (error) {
    console.log(error);
  }
};

exports.postCreateUser = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { user: { userId: result.id } },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).json({
      message: "Signup successfull",
      token: token,
      user: { userId: result.id },
    });
  } catch (error) {
    console.log(error);
  }
};

exports.postLoginUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email: email } });

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
    console.log(error);
  }
};

exports.postDeleteUser = async (req, res, next) => {
  try {
    const result = await User.destroy({ where: { id: req.userId } });

    res.status(200).json({ message: "Delete user successfull", user: result });
  } catch (error) {
    console.log(error);
  }
};
