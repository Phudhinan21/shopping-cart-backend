const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const adminControllers = require("../controllers/admin");
const auth = require("../middleware/auth");

// @route   GET /api/admin/
router.get("/", adminControllers.getAllProducts);

// @route   GET /api/admin/:productId
router.get("/:productId", adminControllers.getProductById);

// @route   POST /api/admin/add-product
router.post(
  "/add-product",
  auth,
  [
    check("title").notEmpty(),
    check("price").notEmpty(),
    check("imageUrl").notEmpty(),
    check("description").notEmpty(),
  ],
  adminControllers.postAddProduct
);

// @route   POST /api/admin/edit-product/:productId
router.put(
  "/edit-product/:productId",
  auth,
  [
    check("title").notEmpty(),
    check("price").notEmpty(),
    check("imageUrl").notEmpty(),
    check("description").notEmpty(),
  ],
  adminControllers.postEditProduct
);

// @route   POST /api/admin/delete-product/:productId
router.delete(
  "/delete-product/:productId",
  auth,
  adminControllers.postDeleteProduct
);

module.exports = router;
