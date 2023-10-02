const express = require("express");
const router = express.Router();

const orderControllers = require("../controllers/order");
const auth = require("../middleware/auth");

// @route   POST /api/order/create-order
router.post("/create-order", auth, orderControllers.postOrder);

// @route   GET /api/order/
router.get("/", auth, orderControllers.getOrders);

module.exports = router;
