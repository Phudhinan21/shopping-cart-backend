const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const sequelize = require("./util/db");
const User = require("./models/user");
const Product = require("./models/product");
const Cart = require("./models/cart");
const CartItem = require("./models/cartItem");
const Order = require("./models/order");
const OrderItem = require("./models/orderItem");

const adminRoutes = require("./routes/admin");
const authRoutes = require("./routes/auth");
const cartRoutes = require("./routes/cart");
const orderRoutes = require("./routes/order");

app.use(bodyParser.json());

// associations
User.hasMany(Product);
Product.belongsTo(User);

User.hasOne(Cart);
Cart.belongsTo(User);

Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

User.hasMany(Order);
Order.belongsTo(User);

Order.belongsToMany(Product, { through: OrderItem });
Product.belongsToMany(Order, { through: OrderItem });

app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/order", orderRoutes);

app.use((req, res, next) => {
  const error = new Error("Could not found.");
  error.code = 404;
  return next(error);
});

app.use((error, req, res, next) => {
  const message = error.message || "Server error";
  const statusCode = error.code || 500;
  return res.status(statusCode).json({ message: message });
});

const PORT = process.env.PORT || 5000;

sequelize
  .sync()
  .then((result) => {
    app.listen(PORT, () => {
      console.log(`Server start on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
