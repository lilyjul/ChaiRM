'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Order, Comment }) {
      // define association here
      this.hasMany(Order, {
        foreignKey: 'customerId',
      });
      this.belongsToMany(Comment, {
        through: 'CommentCustomers',
        foreignKey: 'customerId',
      });
    }
  }
  Customer.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    address: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Customer',
  });
  return Customer;
};


