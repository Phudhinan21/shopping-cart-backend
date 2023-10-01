const { DataTypes } = require("sequelize");

const sequelize = require("../util/db");

const CartItem = sequelize.define("CartItem", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  quantity: {
    type: DataTypes.INTEGER,
  },
});

module.exports = CartItem;
