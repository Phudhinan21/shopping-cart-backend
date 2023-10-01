const { DataTypes } = require("sequelize");

const sequelize = require("../util/db");

const Cart = sequelize.define("Cart", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
});

module.exports = Cart;
