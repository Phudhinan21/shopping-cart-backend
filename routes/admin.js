const express = require("express");
const router = express.Router();

const adminControllers = require("../controllers/admin");

// @route   GET /api/admin/
router.get("/", adminControllers.getAllProducts);

// @route   GET /api/admin/:productId
router.get("/:productId", adminControllers.getProductById);

// @route   POST /api/admin/add-product
router.post("/add-product", adminControllers.postAddProduct);

// @route   POST /api/admin/edit-product/:productId
router.put("/edit-product/:productId", adminControllers.postEditProduct);

// @route   POST /api/admin/delete-product/:productId
router.delete("/delete-product/:productId", adminControllers.postDeleteProduct);

module.exports = router;
