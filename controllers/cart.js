const Cart = require("../models/cart");
const CartItem = require("../models/cartItem");
const Product = require("../models/product");

exports.getCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ where: { userId: req.userId } });

    const cartItem = await CartItem.findAll({ where: { CartId: cart.id } });

    if (!cart) {
      const error = new Error("Not found cart, please try again.");
      error.code = 400;
      throw error;
    }

    res.status(200).json({ message: "Get cart", cart, cartItem });
  } catch (error) {
    return next(error);
  }
};

exports.postCartAddProduct = async (req, res, next) => {
  const { productId } = req.body;

  try {
    const cart = await Cart.findOne({ where: { userId: req.userId } });

    if (!cart) {
      const error = new Error("Not found cart, please try again.");
      error.code = 400;
      throw error;
    }

    const product = await Product.findByPk(productId);

    if (!product) {
      const error = new Error("Not found product.");
      error.code = 400;
      throw error;
    }

    const isAddedProduct = await CartItem.findOne({
      where: { CartId: cart.id, ProductId: productId },
    });

    if (isAddedProduct) {
      const error = new Error("Already added product.");
      error.code = 400;
      throw error;
    }

    const result = await CartItem.create({
      quantity: 1,
      CartId: cart.id,
      ProductId: productId,
    });

    res
      .status(201)
      .json({ message: "Add product to cart successfull", cartItem: result });
  } catch (error) {
    return next(error);
  }
};

exports.postCartDeleteProduct = async (req, res, next) => {
  const { productId } = req.params;

  try {
    const cart = await Cart.findOne({ where: { userId: req.userId } });

    if (!cart) {
      const error = new Error("Not found cart, please try again.");
      error.code = 400;
      throw error;
    }

    const product = await Product.findByPk(productId);

    if (!product) {
      const error = new Error("Not found product.");
      error.code = 400;
      throw error;
    }

    const isAddedProduct = await CartItem.findOne({
      where: { CartId: cart.id, ProductId: productId },
    });

    if (!isAddedProduct) {
      const error = new Error("No this product in cart");
      error.code = 400;
      throw error;
    }

    const result = await CartItem.destroy({
      where: {
        CartId: cart.id,
        ProductId: productId,
      },
    });

    res.status(200).json({
      message: "Delete product in cart successfull",
      cartItem: result,
    });
  } catch (error) {
    return next(error);
  }
};
