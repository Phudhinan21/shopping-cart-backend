const express = require("express");
const router = express.Router();

const adminControllers = require("../controllers/admin");
const auth = require("../middleware/auth");

// @route   GET /api/admin/
router.get("/", adminControllers.getAllProducts);

// @route   GET /api/admin/:productId
router.get("/:productId", adminControllers.getProductById);

// @route   POST /api/admin/add-product
router.post("/add-product", auth, adminControllers.postAddProduct);

// @route   POST /api/admin/edit-product/:productId
router.put("/edit-product/:productId", auth, adminControllers.postEditProduct);

// @route   POST /api/admin/delete-product/:productId
router.delete(
  "/delete-product/:productId",
  auth,
  adminControllers.postDeleteProduct
);

module.exports = router;
