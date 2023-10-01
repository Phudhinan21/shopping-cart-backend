const express = require("express");
const router = express.Router();

const authControllers = require("../controllers/auth");
const auth = require("../middleware/auth");

// @route   GET /api/auth
router.get("/", auth, authControllers.getUser);

// @route   GET /api/auth/users
router.get("/users", authControllers.getAllUsers);

// @route   POST /api/auth/signup
router.post("/signup", authControllers.postCreateUser);

// @route   POST /api/auth/login
router.post("/login", authControllers.postLoginUser);

// @route   DELETE /api/auth/delete-user
router.delete("/delete-user", auth, authControllers.postDeleteUser);

module.exports = router;
