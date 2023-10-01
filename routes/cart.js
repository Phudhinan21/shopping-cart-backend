const express = require("express");
const router = express.Router();
const cartControllers = require("../controllers/cart");
const auth = require("../middleware/auth");

// @route   GET /api/cart
router.get("/", auth, cartControllers.getCart);

// @route   POST /api/cart/add-product
router.post("/add-product", auth, cartControllers.postCartAddProduct);

// @route   DELETE /api/delete-product/:productId
router.delete(
  "/delete-product/:productId",
  auth,
  cartControllers.postCartDeleteProduct
);

module.exports = router;
