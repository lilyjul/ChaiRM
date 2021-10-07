'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Customers, Order }) {
      // define association here
      this.belongsTo(User, {
        foreignKey: 'userId',
      });
      this.belongsToMany(Customers, {
        through: 'CommentCustomers',
        foreignKey: 'commentId',
      });
      this.belongsToMany(Order, {
        through: 'CommentOrders',
        foreignKey: 'commentId',
      });
    }
  }
  Comment.init({
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    userId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};
