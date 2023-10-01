const Product = require("../models/product");

exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.findAll();

    res.status(200).json({ message: "Get all products", products: products });
  } catch (error) {
    console.log(error);
  }
};

exports.getProductById = async (req, res, next) => {
  const { productId } = req.params;

  try {
    const product = await Product.findByPk(productId);

    res.status(200).json({ message: "Get product", product: product });
  } catch (error) {
    console.log(error);
  }
};

exports.postAddProduct = async (req, res, next) => {
  const { title, price, imageUrl, description } = req.body;

  try {
    const result = await Product.create({
      title,
      price,
      imageUrl,
      description,
    });

    res
      .status(201)
      .json({ message: "Add product successfull", product: result });
  } catch (error) {
    console.log(error);
  }
};

exports.postEditProduct = async (req, res, next) => {
  const { productId } = req.params;
  const { title, price, imageUrl, description } = req.body;

  try {
    const product = await Product.findByPk(productId);

    product.title = title;
    product.price = price;
    product.imageUrl = imageUrl;
    product.description = description;

    const result = await product.save();

    res
      .status(200)
      .json({ message: "Updated product successfull", product: result });
  } catch (error) {
    console.log(error);
  }
};

exports.postDeleteProduct = async (req, res, next) => {
  const { productId } = req.params;
  try {
    const result = await Product.destroy({
      where: {
        id: productId,
      },
    });

    res
      .status(200)
      .json({ message: "Delete product successfull", product: result });
  } catch (error) {
    console.log(error);
  }
};
