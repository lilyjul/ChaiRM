'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CommentCustomer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  CommentCustomer.init({
    commentId: DataTypes.INTEGER,
    customerId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'CommentCustomer',
  });
  return CommentCustomer;
};
