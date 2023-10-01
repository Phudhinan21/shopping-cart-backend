const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const sequelize = require("./util/db");
const User = require("./models/user");
const Product = require("./models/product");

const adminRoutes = require("./routes/admin");
const authRoutes = require("./routes/auth");

app.use(bodyParser.json());

// associations
User.hasMany(Product);
Product.belongsTo(User);

app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);

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
