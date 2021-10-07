'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CommentOrder extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  CommentOrder.init({
    commentId: DataTypes.INTEGER,
    orderId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'CommentOrder',
  });
  return CommentOrder;
};
