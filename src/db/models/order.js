'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Customer, Comment }) {
      // define association here
      this.belongsTo(Customer, {
        foreignKey: 'customerId',
      });
      this.belongsToMany(Comment, {
        through: 'CommentOrders',
        foreignKey: 'orderId',
      });
    }
  }
  Order.init({
    orderNumber: DataTypes.INTEGER,
    furnType: DataTypes.STRING,
    furnPrice: DataTypes.INTEGER,
    shippingPrice: DataTypes.INTEGER,
    installPrice: DataTypes.INTEGER,
    shippingCrew: DataTypes.STRING,
    installCrew: DataTypes.STRING,
    orderStatus: DataTypes.STRING,
    customerId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};
