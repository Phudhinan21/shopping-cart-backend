const Cart = require("../models/cart");
const CartItem = require("../models/cartItem");
const Order = require("../models/order");
const OrderItem = require("../models/orderItem");

exports.postOrder = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ where: { UserId: req.userId } });

    if (!cart) {
      const error = new Error("Not found cart, please try again.");
      error.code = 400;
      throw error;
    }

    const cartItem = await CartItem.findAll({ where: { CartId: cart.id } });

    if (cartItem.length === 0) {
      const error = new Error(
        "There are no item in this cart, please add item before order."
      );
      error.code = 400;
      throw error;
    }

    const order = await Order.create({ UserId: req.userId });

    const orderItem = await OrderItem.bulkCreate(
      cartItem.map((item) => {
        return {
          quantity: item.quantity,
          ProductId: item.ProductId,
          OrderId: order.id,
        };
      })
    );

    CartItem.destroy({ where: { CartId: cart.id } });

    res
      .status(201)
      .json({ message: "create order successfull", order, orderItem });
  } catch (error) {
    return next(error);
  }
};

exports.getOrders = async (req, res, next) => {
  try {
    const order = await Order.findAll({ where: { UserId: req.userId } });

    if (order.length === 0) {
      const error = new Error("There are no order");
      error.code = 400;
      throw error;
    }

    res.status(200).json({ message: "Get order", order });
  } catch (error) {
    return next(error);
  }
};
